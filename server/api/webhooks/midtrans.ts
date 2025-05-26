import crypto from 'crypto'
import { send } from 'h3'
import { useSupabase } from '~/composables/useSupabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  console.log('[Webhook] Midtrans Payload:', body)

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key: incomingSignature,
    transaction_status,
    payment_type,
    custom_field1 // user_id
  } = body || {}

  if (!order_id || !status_code || !gross_amount || !incomingSignature) {
    console.warn('[Webhook] Missing fields in payload')
    return send(event, 'INVALID_PAYLOAD', 'text/plain')
  }

  const grossAmountStr = typeof gross_amount === 'string' ? gross_amount : String(gross_amount)

  const serverKey = config.midtransServerKey || ''
  const rawSignature = order_id + status_code + grossAmountStr + serverKey
  const calculatedSignature = crypto.createHash('sha512').update(rawSignature).digest('hex')

  console.log('[Webhook] Signature Raw:', rawSignature)
  console.log('[Webhook] Signature Calc:', calculatedSignature)
  console.log('[Webhook] Signature Incoming:', incomingSignature)

  if (calculatedSignature !== incomingSignature) {
    console.warn('[Webhook] Signature mismatch!')
    return send(event, 'INVALID_SIGNATURE', 'text/plain')
  }

  try {
    const supabase = useSupabase()
    const user_id = custom_field1 ? parseInt(custom_field1) : null

    const { error, data } = await supabase.from('transactions').upsert({
      order_id,
      status: transaction_status,
      payment_type,
      gross_amount: grossAmountStr,
      user_id,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'order_id'
    })

    if (error) {
      console.error('[Webhook] Supabase Error:', error)
    } else {
      console.log(`[Webhook] Supabase Update Success for order_id: ${order_id}`)
    }

    return send(event, 'OK', 'text/plain')
  } catch (err) {
    console.error('[Webhook] Handler Error:', err)
    return send(event, 'OK', 'text/plain')
  }
})
