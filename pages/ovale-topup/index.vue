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

  <input
    v-if="selectedNominal === 'custom'"
    v-model="customPrice"
    type="number"
    class="form-control mb-3"
    placeholder="Masukkan harga custom"
  />

  <label>Metode Pembayaran:</label>
  <select v-model="selectedPayment" class="form-control mb-3">
    <option disabled value="">Pilih metode</option>
    <option v-for="option in paymentOptions" :key="option.name" :value="option.name">
      {{ option.name }}
    </option>
  </select>

  <button
    class="btn btn-success w-100"
    type="submit"
    v-if="!showQR"
  >
    Topup Sekarang
  </button>
</form>

<div v-if="showQR" class="qr-section">
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
  const selectedPayment = ref('')

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

  
  const submitTopup = () => {
  const nominal = selectedNominal.value === 'custom'
    ? customPrice.value
    : selectedNominal.value

  if (!idOvale.value.trim()) return alert('ID Ovale harus diisi!')
  if (!nominal) return alert('Pilih nominal atau isi custom nominal!')
  if (!selectedPayment.value) return alert('Pilih metode pembayaran!')

  showQR.value = true
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
  </style>
  