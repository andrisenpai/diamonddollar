// server/api/webhook.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    // Validasi signature key, opsional
  
    if (body.transaction_status === 'settlement' || body.transaction_status === 'pending') {
      const maskedId = body.order_id.slice(-3).padStart(body.order_id.length, '*') // ***123
      const nominal = Number(body.gross_amount)
  
      // Simpan ke DB atau file
      await saveTransaction({
        id: body.order_id,
        maskedId,
        nominal,
        status: body.transaction_status,
        time: new Date().toISOString()
      })
    }
  
    return { success: true }
  })
  