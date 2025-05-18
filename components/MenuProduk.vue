<template>
  <div class="mt-4">
    <div v-for="kategori in produk" :key="kategori.nama" class="mb-3">
      <h5 class="text-success fw-bold mb-2">{{ kategori.nama }}</h5>
      <div class="row g-2">
        <div v-for="item in kategori.items" :key="item" class="col-6">
          <div
            class="card shadow-sm text-center pb-3 h-100"
            @click="openPopup(item)"
            style="cursor: pointer;"
          >
            <img :src="getImgSrc(item)" :alt="item" />
            <span class="fw-semibold">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
<div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
  <div class="popup-content">
    <h5>Detail untuk {{ activeItem }}</h5>

    <!-- Submenu sebagai tombol -->
    <div class="submenu-container">
      <button
        v-for="sub in getSubmenu(activeItem)"
        :key="sub"
        class="submenu-btn"
        @click="onSubmenuClick(sub)"
        type="button"
      >
        {{ sub }}
      </button>
    </div>

    <!-- Form khusus Ovale -->
    <div v-if="activeItem === 'Ovale' && selectedSubmenu" class="form-ovale mt-3">
      <label for="idOvale" class="form-label">Masukkan ID Ovale:</label>
      <form>
        <input
        id="idOvale"
        type="text"
        v-model="idOvale"
        class="form-control mb-2"
        placeholder="Contoh: 123456789"
        />

      </form>
      
      <button
        class="btn btn-success w-100"
        @click.prevent="beliOvale"
        type="button"
      >
        Beli {{ selectedSubmenu }}
      </button>
    </div>

    <button @click="closePopup" class="btn btn-primary mt-3">Tutup</button>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const produk = [
  { nama: 'Topup Koin', items: ['Ovale', 'Hita', 'Supermeet'] },
  { nama: 'Topup Game', items: ['Mobile Legend', 'Pubg Mobile'] },
  { nama: 'Topup Pulsa & Kuota', items: ['Pulsa', 'Kuota'] },
  { nama: 'Topup E-wallet', items: ['Dana', 'Ovo', 'Link'] }
]
const idOvale = ref('')
const selectedSubmenu = ref('')

const onSubmenuClick = (sub) => {
  selectedSubmenu.value = sub
}

const beliOvale = () => {
  const harga = selectedSubmenu.value
  const id = idOvale.value.trim()

  if (!id) return alert('ID Ovale harus diisi.')

  const message = `Hallo kaka, saya pesan koin dari shinchan.app seharga ${harga} dengan id Ovale ${id}. Berikut ini screenshoot bukti transfernya`
  const url = `https://wa.me/6285693282015?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

const submenuData = {
  Ovale: ['Topup 10k', 'Topup 20k', 'Topup 50k'],
  Hita: ['Paket A', 'Paket B'],
  'Mobile Legend': ['Skin A', 'Skin B', 'Skin C'],
  'Pubg Mobile': ['UC 100', 'UC 300'],
  Pulsa: ['5k', '10k', '25k'],
  Kuota: ['1GB', '5GB', '10GB'],
  Dana: ['Rp 10.000', 'Rp 20.000'],
  Ovo: ['Saldo 15k', 'Saldo 30k'],
  Link: ['Isi 50k', 'Isi 100k']
}

const activeItem = ref(null)
const showPopup = ref(false)

const openPopup = (item) => {
  activeItem.value = item
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
  activeItem.value = null
}

const getSubmenu = (item) => {
  return submenuData[item] || []
}

const getImgSrc = (item) => {
  const fileName = item.toLowerCase().replace(/\s+/g, '-') + '.png'
  return `/icons/${fileName}`
}
</script>

<style scoped>
/* Background halaman */
:root {
  --bg-color: #0a141e;
  --font-family: 'Source Code Pro', monospace;
  --text-color: #b1f2f7;
}

div.mt-4 {
  background-color: var(--bg-color);
  font-family: var(--font-family);
  color: var(--text-color);
  min-height: 100vh;
  padding: 1rem;
}

/* Popup overlay dan konten */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 20, 30, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: var(--font-family);
  color: var(--text-color);
}

.popup-content {
  background: #122433; /* sedikit lebih terang dari bg */
  padding: 20px 30px;
  border-radius: 8px;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.7);
  font-family: var(--font-family);
  color: var(--text-color);
}

/* List submenu */
.popup-content ul {
  padding-left: 1.2rem;
  margin-top: 10px;
  list-style-type: disc;
}

.popup-content li {
  margin-bottom: 6px;
  cursor: pointer;
  transition: color 0.3s;
}

.popup-content li:hover {
  color: #64e3f9;
}

/* Tombol tutup */
.popup-content button {
  margin-top: 15px;
  padding: 6px 12px;
  background-color: #64e3f9;
  border: none;
  border-radius: 4px;
  color: #0a141e;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-family);
  transition: background-color 0.3s;
}

.popup-content button:hover {
  background-color: #3db8d7;
}
.submenu-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end; /* supaya tombol di kanan */
  direction: rtl; /* agar teks dan tombol dari kanan ke kiri */
  margin-top: 10px;
}

.submenu-btn {
  background-color: #64e3f9;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  font-family: var(--font-family);
  color: #0a141e;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  direction: ltr; /* supaya teks tetap kiri ke kanan */
  white-space: nowrap;
}

.submenu-btn:hover {
  background-color: #3db8d7;
}

</style>

