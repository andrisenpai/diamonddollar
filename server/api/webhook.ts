import { useSupabase } from '~/composables/useSupabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = useSupabase()

  const { order_id, transaction_status, payment_type, gross_amount } = body

  const { error } = await supabase.from('transactions').upsert({
    order_id,
    status: transaction_status,
    payment_type,
    gross_amount,
    created_at: new Date().toISOString()
  })

  if (error) {
    console.error('Error saving transaction:', error)
    setResponseStatus(event, 500)
    return { isSuccessfull: false, message: 'Failed saving transaction' }
  }

  return { isSuccessfull: true, message: 'Transaction stored' }
})
