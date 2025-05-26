import crypto from 'crypto'
import { send } from 'h3'
import { useSupabase } from '~/composables/useSupabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = useSupabase()

  const body = await readBody(event)

  console.log('[Webhook] Midtrans Payload Received')

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key: incomingSignature,
    transaction_status,
    payment_type,
  } = body || {}

  // Validasi field penting
  if (!order_id || !status_code || !gross_amount || !incomingSignature) {
    console.warn('[Webhook] Missing fields in payload')
    return send(event, 'INVALID_PAYLOAD', 'text/plain')
  }

  // Pastikan gross_amount string
  const grossAmountStr = typeof gross_amount === 'string'
    ? gross_amount
    : String(gross_amount)

  // Verifikasi Signature
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

  // Ambil user_id dari transaksi yang sudah dibuat sebelumnya
  const { data: existing, error: lookupError } = await supabase
    .from('transactions')
    .select('user_id')
    .eq('order_id', order_id)
    .single()

  if (lookupError || !existing?.user_id) {
    console.warn('[Webhook] User ID not found for order_id:', order_id)
    return send(event, 'USER_NOT_FOUND', 'text/plain')
  }

  // Upsert status terbaru
  try {
    const { error: upsertError, data: upsertData } = await supabase
      .from('transactions')
      .upsert({
        order_id,
        user_id: existing.user_id,
        status: transaction_status,
        payment_type,
        gross_amount: grossAmountStr,
        created_at: new Date().toISOString(),
      })

    if (upsertError) {
      console.error('[Webhook] Supabase Upsert Error:', upsertError)
    } else {
      console.log('[Webhook] Supabase Upsert Success for order_id:', order_id)
    }

    return send(event, 'OK', 'text/plain')
  } catch (err) {
    console.error('[Webhook] Handler Exception:', err)
    return send(event, 'OK', 'text/plain') // tetap OK agar Midtrans tidak retry
  }
})
