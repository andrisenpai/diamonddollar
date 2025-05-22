// /server/utils/midtrans.ts
import midtransClient from 'midtrans-client'

export const midtrans = new midtransClient.Snap({
  isProduction: false, // ← pakai true untuk production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY // opsional
})