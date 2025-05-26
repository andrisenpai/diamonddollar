<template>
    <div class="container mt-3">
      <div class="logo-section">
        <img src="/icons/ovale.png" alt="Ovale Logo" />
      </div>
      <div class="description">
        <h2 class="text-center">Topup Ovale</h2>
        <p class="text-center">Masukkan ID dan nominal topup kamu.</p>
        <form @submit.prevent="submitTopup">
  <label>ID Ovale:</label>
  <input
    v-model="idOvale"
    type="text"
    class="form-control mb-3"
    placeholder="Contoh: 123456789"
  />

  <label>Pilih Nominal:</label>
  <div class="nominal-container mb-3">
    <button
      v-for="nominal in nominalList"
      :key="nominal"
      type="button"
      class="btn btn-outline-info"
      @click="selectNominal(nominal)"
      :class="{ active: selectedNominal === nominal }"
    >
      {{ nominal === 'custom' ? 'Custom' : `Rp ${nominal}` }}
    </button>
  </div>
  <label>Pilih Mode Pembayaran:</label>
<div class="mb-3">
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" v-model="paymentMode" value="otomatis" id="otomatis" />
    <label class="form-check-label" for="otomatis">Otomatis (Midtrans)</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" v-model="paymentMode" value="manual" id="manual" />
    <label class="form-check-label" for="manual">Manual</label>
  </div>
</div>

<input
  v-if="selectedNominal === 'custom'"
  v-model="customPriceFormatted"
  type="text"
  class="form-control mb-3"
  placeholder="Masukkan nominal custom"
  @input="customPriceRaw = getRawNumber(customPriceFormatted)"
/>


  <label>Metode Pembayaran:</label>
  <select v-model="selectedPayment" class="form-control mb-3">
    <option disabled value="">Pilih metode</option>
    <option v-for="option in paymentOptions" :key="option.name" :value="option.name">
      {{ option.name }}
    </option>
  </select>

  

<!-- Tombol Topup Otomatis -->
<button
  class="btn btn-info w-100"
  type="submit"
  v-if="paymentMode === 'otomatis'"
>
  Bayar Sekarang via Midtrans
</button>
<!-- Tombol Topup Manual hanya jika mode manual -->
<button
  class="btn btn-info w-100"
  type="submit"
  v-if="paymentMode === 'manual' && !showQR"
>
  Topup Sekarang
</button>
</form>

<div v-if="showQR" class="qr-section" ref="qrSection">
  <h5>Pembayaran via {{ selectedPayment }}</h5>
  <img src="/icons/ovale.png" alt="QR Dummy" class="qr-img" />
  <p class="mt-2">Silakan transfer ke QR atau via informasi berikut:</p>

  <p v-if="['DANA', 'OVO'].includes(selectedPayment)">
    Nomor: <strong>{{ paymentInfo[selectedPayment]?.number }}</strong><br />
    Atas Nama: <strong>{{ paymentInfo[selectedPayment]?.owner }}</strong>
  </p>

  <p v-else>
    Bank: <strong>{{ selectedPayment }}</strong><br />
    No Rekening: <strong>{{ paymentInfo[selectedPayment]?.number }}</strong><br />
    Atas Nama: <strong>{{ paymentInfo[selectedPayment]?.owner }}</strong>
  </p>

  <a
    class="btn btn-info w-100 mt-2"
    :href="whatsappUrl"
    target="_blank"
  >
    Kirim Bukti Transfer via WhatsApp
  </a>

  <button
    class="btn btn-outline-danger w-100 mt-2 mb-5"
    @click="resetForm"
  >
    Reset
  </button>
</div>


      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRupiahInput } from '~/composables/useRupiahInput'

const {
  rawValue: customPriceRaw,
  formattedValue: customPriceFormatted,
  getRawNumber
} = useRupiahInput('')

  const selectedPayment = ref('')
  const paymentMode = ref('otomatis') // default manual

  const paymentOptions = [
  { name: 'DANA' },
  { name: 'OVO' },
  { name: 'Bank Mandiri' },
  { name: 'Bank BCA' }
]

const paymentInfo = {
  DANA: {
    owner: 'Riska Aulia',
    number: '085712345678'
  },
  OVO: {
    owner: 'Riska Aulia',
    number: '085712345678'
  },
  'Bank Mandiri': {
    owner: 'Riska Aulia',
    number: '1234567890'
  },
  'Bank BCA': {
    owner: 'Riska Aulia',
    number: '9876543210'
  }
}

  const idOvale = ref('')
  const selectedNominal = ref('')
  const customPrice = ref('')
  const showQR = ref(false)
  
  const nominalList = ['10000', '20000', '50000', '100000', 'custom']
  watch(paymentMode, () => {
  showQR.value = false
})

  const selectNominal = (nominal) => {
    selectedNominal.value = nominal
    if (nominal !== 'custom') customPrice.value = ''
  }
  
  const whatsappUrl = computed(() => {
  const nominal = selectedNominal.value === 'custom'
    ? customPrice.value
    : selectedNominal.value
  const message = `Halo kak, saya sudah transfer untuk topup Ovale sebesar Rp ${nominal}, ID saya: ${idOvale.value}, via ${selectedPayment.value}. Berikut bukti transfernya.`
  return `https://wa.me/6285693282015?text=${encodeURIComponent(message)}`
})

const qrSection = ref(null)
  
const submitTopup = async () => {
  const nominal = selectedNominal.value === 'custom'
  ? parseInt(customPriceRaw.value)
  : selectedNominal.value

  if (!nominal || nominal < 10000) return alert('Nominal minimal Rp10.000!')
  if (!idOvale.value.trim()) return alert('ID Ovale harus diisi!')
  if (!nominal) return alert('Pilih nominal atau isi custom nominal!')
  if (!selectedPayment.value) return alert('Pilih metode pembayaran!')

  if (paymentMode.value === 'manual') {
    showQR.value = true
  await nextTick()
  qrSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return
  }

  // Mode otomatis (Midtrans)
  try {
  
    const response = await $fetch('/api/payment', {
  method: 'POST',
  body: {
    idOvale: idOvale.value,
    nominal,
    paymentMethod: selectedPayment.value,
    custom_field1: idOvale.value // ← ini yang penting
  }
})

    console.log('Response Midtrans:', response)

    if (!response.token) {
      throw new Error('Token Midtrans tidak ditemukan')
    }

    window.snap.pay(response.token, {
      onSuccess: function(result) {
        alert('Pembayaran berhasil!')
        console.log('Success:', result)
        resetForm()
      },
      onPending: function(result) {
        alert('Pembayaran belum selesai, silakan lanjutkan di Midtrans')
        console.log('Pending:', result)
      },
      onError: function(result) {
        alert('Pembayaran gagal, coba lagi nanti')
        console.error('Error:', result)
      },
      onClose: function() {
        console.log('User menutup popup pembayaran')
      }
    })
  } catch (err) {
    console.error('Gagal memproses Midtrans:', err)
    alert('Gagal memproses pembayaran otomatis')
  }
}



  
  const resetForm = () => {
    idOvale.value = ''
    selectedNominal.value = ''
    customPrice.value = ''
    showQR.value = false
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: auto;
    background: #0a141e;
    color: #b1f2f7;
    padding: 1rem;
    min-height: 100vh;
    font-family: 'Source Code Pro', monospace;
  }
  
  .logo-section {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .logo-section img {
    max-width: 200px;
  }
  
  .description h2 {
    font-weight: bold;
    color: #b1f2f7;
  }
  
  .nominal-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .nominal-container .btn {
    flex: 1 0 30%;
    white-space: nowrap;
  }
  
  .nominal-container .btn.active {
    background-color: #b1f2f7;
    color: #0a141e;
  }
  
  .qr-section {
    text-align: center;
    margin-top: 1.5rem;
  }
  
  .qr-img {
    max-width: 300px;
    width: 100%;
    border: 2px solid #b1f2f7;
    border-radius: 8px;
  }
  form {
  background: #0a141e;
  color: #b1f2f7;
}

input,
select,
textarea {
  background-color: #0a141e;
  color: #b1f2f7;
  border: 1px solid #b1f2f7;
}

input::placeholder {
  color: #b1f2f7aa;
}

.form-check-label,
label {
  color: #b1f2f7;
}

input[type="radio"] {
  accent-color: #b1f2f7;
}

  </style>
  