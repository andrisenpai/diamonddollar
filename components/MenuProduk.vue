<template>
  <div class="mt-4">
    <div v-for="kategori in produk" :key="kategori.nama" class="mb-3">
      <h5 class="text-success fw-bold mb-2">{{ kategori.nama }}</h5>
      <div class="row g-2">
        <div v-for="item in kategori.items" :key="item" class="col-4">
          <div
            class="card shadow-sm text-center pb-3 h-100"
            @click="goToPage(item)"
            style="cursor: pointer;"
          >
            <img :src="getImgSrc(item)" :alt="item" />
            <span class="fw-semibold">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const produk = [
  { nama: 'Topup Koin', items: ['Ovale', 'Hita', 'Supermeet'] },
  { nama: 'Topup Game', items: ['Mobile Legend', 'Pubg Mobile'] },
  { nama: 'Topup Pulsa & Kuota', items: ['Pulsa', 'Kuota'] },
  { nama: 'Topup E-wallet', items: ['Dana', 'Ovo', 'Link'] }
]

// Redirect ke halaman sesuai nama item, misalnya: Ovale → /ovale-topup
const goToPage = (item) => {
  const path = `/${item.toLowerCase().replace(/\s+/g, '-')}-topup`
  router.push(path)
}

const getImgSrc = (item) => {
  const fileName = item.toLowerCase().replace(/\s+/g, '-') + '.png'
  return `/icons/${fileName}`
}
</script>

<style scoped>
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

.card img {
  width: auto;
  /* height: 100px; */
  max-width: 100%;
  /* object-fit: contain; */
  /* margin: 1rem auto 0.5rem; */
  display: block;
}
.card{
  border: none;
}
</style>
