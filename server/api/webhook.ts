import { saveTransaction } from '~/server/utils/transactionStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.transaction_status === 'settlement' || body.transaction_status === 'pending') {
    const maskedId = body.order_id.slice(-3).padStart(body.order_id.length, '*') // ***123
    const nominal = Number(body.gross_amount)

    await saveTransaction({
      id: body.order_id,
      maskedId,
      nominal,
      status: body.transaction_status,
      time: new Date().toISOString()
    })

    console.log('✅ Transaksi berhasil disimpan:', body.order_id)
  }

  return { success: true }
})
