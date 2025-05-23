// server/api/testimoni.ts
import { getLastTransactions } from '~/server/utils/transactionStore'

export default defineEventHandler(async () => {
  const data = await getLastTransactions(10)
  return {
    isSuccessfull: true,
    data: data.map(d => ({
      id: d.maskedId,
      nominal: d.nominal,
      status: d.status,
      time: d.time
    }))
  }
})
