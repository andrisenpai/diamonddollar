<template>
  <div class="container py-1 mt-3 robotic-bg text-robotic-text min-vh-100">
    <div v-for="kategori in produk" :key="kategori.nama" class="mb-2">
      <h5 class="fw-bold robotic-title mb-3">{{ kategori.nama }}</h5>
      <div class="row g-1 bg-product-menu">
        <div
          v-for="item in kategori.items"
          :key="item"
          class="col-3 col-sm-3 col-md-3"
        >
          <div
            class="card robotic-card shadow-sm text-center h-100 p-2 cursor-pointer"
            @click="goToPage(item)"
          >
            <img
              :src="getImgSrc(item)"
              :alt="item"
              class="mx-auto robotic-img img-fluid"
              loading="lazy"
            />
            <span class="fw-semibold robotic-text">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const {ensureAuth} = useRequireAuth()
const router = useRouter()

const produk = [
  { nama: 'Topup Koin', items: ['Ovale', 'Hita', 'Supermeet', 'Hago'] },
  { nama: 'Topup Game', items: ['Mobile Legend', 'Pubg Mobile', 'Free Fire'] },
  { nama: 'Topup Pulsa & Kuota', items: ['Pulsa', 'Kuota'] },
  { nama: 'Topup E-wallet', items: ['Dana', 'Ovo', 'Link'] },
]

// Redirect ke halaman sesuai nama item, misalnya: Ovale → /ovale-topup
const goToPage = (item) => {
  const path = `/${item.toLowerCase().replace(/\s+/g, '-')}-topup`
  ensureAuth(() => {
    router.push(path)
  })
}


const getImgSrc = (item) => {
  const fileName = item.toLowerCase().replace(/\s+/g, '-') + '.png'
  return `/icons/${fileName}`
}
</script>

<style scoped>
/* Warna dan font tema robotic */
:root {
  --robotic-bg: #0a141e;
  --robotic-text: #7ef1ff;
  --robotic-title-color: #00d8ff;
  --robotic-card-bg: #112233;
  --robotic-card-hover-shadow: 0 0 15px 3px #00d8ff88;
  --robotic-cursor: pointer;
}
.bg-product-menu{
  background-color: rgba(255, 255, 255, 0.1)!important;
}
.robotic-bg {
  background-color: var(--robotic-bg);
  color: var(--robotic-text);
  min-height: 100vh;
}

.robotic-title {
  color: var(--robotic-title-color);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 900;
  user-select: none;
}

.robotic-card {
  background-color: var(--robotic-card-bg);
  border: none;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: var(--robotic-cursor);
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.robotic-card:hover {
  transform: scale(1.05);
  box-shadow: var(--robotic-card-hover-shadow);
}

.robotic-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.robotic-text {
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color:#7ef1ff!important;
}
</style>
