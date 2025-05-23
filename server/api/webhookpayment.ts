// server/api/webhook/midtrans.post.ts

import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validasi signature dari Midtrans
  const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
  const hash = crypto
    .createHash('sha512')
    .update(
      body.order_id + body.status_code + body.gross_amount + serverKey
    )
    .digest('hex')

  if (hash !== body.signature_key) {
    return { status: 'invalid-signature' }
  }

  // Kalau pembayaran sukses
  if (body.transaction_status === 'settlement' || body.transaction_status === 'capture') {
    // Di sinilah kamu bisa: 
    // - Update status transaksi di database
    // - Tambahkan saldo user
    // - Trigger webhook Pipedream
    console.log('✅ Pembayaran sukses:', body.order_id)
  } else {
    console.log('⏳ Status belum lunas:', body.transaction_status)
  }

  return { received: true }
})
