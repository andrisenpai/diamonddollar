import crypto from 'crypto'
import { useSupabase } from '~/composables/useSupabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('[Webhook] Midtrans Payload:', body)

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key: incomingSignature,
    transaction_status,
    payment_type
  } = body || {}

  // Step 1: Verifikasi Signature
  const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
  const rawSignature = order_id + status_code + gross_amount + serverKey
  const calculatedSignature = crypto
    .createHash('sha512')
    .update(rawSignature)
    .digest('hex')

  if (calculatedSignature !== incomingSignature) {
    console.warn('[Webhook] Signature mismatch!')
    return 'INVALID_SIGNATURE'
  }

  // Step 2: Simpan ke Supabase
  try {
    if (order_id) {
      const supabase = useSupabase()
      const { error, data } = await supabase.from('transactions').upsert({
        order_id,
        status: transaction_status,
        payment_type,
        gross_amount,
        created_at: new Date().toISOString()
      })

      if (error) {
        console.error('[Webhook] Supabase Error:', error)
      } else {
        console.log('[Webhook] Supabase Success:', data)
      }
    } else {
      console.warn('[Webhook] No order_id received.')
    }

    return 'OK' // Midtrans expects 'OK' as plain text
  } catch (err) {
    console.error('[Webhook] Handler Error:', err)
    return 'OK' // Tetap return OK agar tidak retry
  }
})
