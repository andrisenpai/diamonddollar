import midtransClient from 'midtrans-client'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  // Hanya izinkan POST
  if (event.node.req.method !== 'POST') {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
  }

  const body = await readBody(event)
  const { idOvale, nominal, paymentMethod } = body

  const parsedNominal = parseInt(nominal)
  if (!idOvale || !parsedNominal || !paymentMethod) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Data tidak lengkap' }))
  }

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
  })

  const baseParams = {
    transaction_details: {
      order_id: 'TOPUP-' + uuidv4(),
      gross_amount: parsedNominal
    },
    item_details: [{
      id: 'topup-ovale',
      name: `Topup Ovale ${idOvale}`,
      price: parsedNominal,
      quantity: 1
    }],
    customer_details: {
      first_name: idOvale
    }
  }

  let transactionParams = {}

  switch (paymentMethod.toLowerCase()) {
    case 'ovo':
    case 'dana':
      // NOTE: Sandbox Midtrans biasanya handle ini via QRIS
      transactionParams = {
        ...baseParams,
        payment_type: 'qris'
      }
      break
    case 'bank mandiri':
      transactionParams = {
        ...baseParams,
        payment_type: 'bank_transfer',
        bank_transfer: {
          bank: 'mandiri'
        }
      }
      break
    case 'bank bca':
      transactionParams = {
        ...baseParams,
        payment_type: 'bank_transfer',
        bank_transfer: {
          bank: 'bca'
        }
      }
      break
    default:
      // fallback ke QRIS kalau metode tidak dikenali
      transactionParams = {
        ...baseParams,
        payment_type: 'qris'
      }
      break
  }

  try {
    const transaction = await snap.createTransaction(transactionParams)
    return { token: transaction.token }
  } catch (error) {
    console.error('Midtrans Error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Midtrans gagal dipanggil' }))
  }
})
