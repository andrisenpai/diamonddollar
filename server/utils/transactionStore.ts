import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.resolve('./data/transactions.json')

interface Transaction {
  id: string
  maskedId: string
  nominal: number
  status: string
  time: string
}

export async function saveTransaction(data: Transaction) {
  try {
    let existing: Transaction[] = []
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      existing = JSON.parse(content)
    } catch (err) {
      // file belum ada, tidak masalah
    }

    existing.unshift(data)

    // Simpan hanya 50 terakhir
    if (existing.length > 50) existing = existing.slice(0, 50)

    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2))
  } catch (err) {
    console.error('Gagal menyimpan transaksi:', err)
  }
}

export async function getLastTransactions(count = 10): Promise<Transaction[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(content) as Transaction[]
    return data.slice(0, count)
  } catch {
    return []
  }
}
