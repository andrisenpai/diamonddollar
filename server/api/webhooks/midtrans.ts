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
  } = body || {}

  if (!order_id || !status_code || !gross_amount || !incomingSignature) {
    console.warn('[Webhook] Missing fields in payload')
    return send(event, 'INVALID_PAYLOAD', 'text/plain')
  }

  const grossAmountStr = typeof gross_amount === 'string' ? gross_amount : String(gross_amount)

  // Verifikasi signature
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

  const supabase = useSupabase()

  // Update transaksi berdasarkan order_id
  const { error } = await supabase
    .from('transactions')
    .update({
      status: transaction_status,
      payment_type,
      gross_amount: grossAmountStr,
      updated_at: new Date().toISOString(),
    })
    .eq('order_id', order_id)

  if (error) {
    console.error('[Webhook] Supabase Update Error:', error)
  } else {
    console.log('[Webhook] Supabase Update Success for order_id:', order_id)
  }

  return send(event, 'OK', 'text/plain') // supaya Midtrans gak retry
})
