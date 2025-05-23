// server/api/webhook.ts
import { saveTransaction } from '~/server/utils/transactionStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Cek status yang dianggap berhasil
  if (
    body.transaction_status === 'capture' || 
    body.transaction_status === 'settlement' ||
    body.transaction_status === 'pending'
  ) {
    // Format maskedId dari order_id (misal ***49be)
    const maskedId = body.order_id.slice(-4).padStart(body.order_id.length, '*')

    const nominal = Number(body.gross_amount) || 0

    await saveTransaction({
      id: body.order_id,
      maskedId,
      nominal,
      status: body.transaction_status,
      time: body.transaction_time || new Date().toISOString()
    })
  }

  return { success: true }
})
