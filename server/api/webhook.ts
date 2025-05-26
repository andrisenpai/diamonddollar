import { useSupabase } from '~/composables/useSupabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Midtrans Webhook Payload:', body)

  const { order_id, transaction_status, payment_type, gross_amount } = body || {}

  try {
    if (order_id) {
      const supabase = useSupabase()
      const { error } = await supabase.from('transactions').upsert({
        order_id,
        status: transaction_status,
        payment_type,
        gross_amount,
        created_at: new Date().toISOString()
      })

      if (error) {
        console.error('Error saving transaction:', error)
        // Tetap return 200 agar tidak gagal di Midtrans
      }
    } else {
      console.warn('No order_id received in webhook.')
    }

    // Midtrans expect 200 OK
    return { status: 'ok' }
  } catch (e) {
    console.error('Webhook handler error:', e)
    return { status: 'ok' } // Jangan return 500 saat test Midtrans
  }
})
