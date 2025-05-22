import { ref, watch } from 'vue'

export function useRupiahInput(initialValue = '') {
  const rawValue = ref(initialValue)
  const formattedValue = ref('')

  const formatRupiah = (value: string | number) => {
    const number = parseInt(value.toString().replace(/\D/g, ''))
    if (isNaN(number)) return ''
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number)
  }

  const getRawNumber = (formatted: string) => {
    return formatted.replace(/[^0-9]/g, '')
  }

  watch(rawValue, (newVal) => {
    formattedValue.value = formatRupiah(newVal)
  })

  return {
    rawValue,
    formattedValue,
    getRawNumber
  }
}
