<template>
    <div class="mt-4">
      <div v-for="kategori in produk" :key="kategori.nama" class="mb-3">
        <h5 class="text-success fw-bold mb-2">{{ kategori.nama }}</h5>
        <div class="row g-2">
          <div v-for="item in kategori.items" :key="item" class="col-6">
            <div class="card shadow-sm text-center pb-3 h-100">
              <!-- Gambar dinamis berdasarkan nama item -->
              <img :src="getImgSrc(item)" :alt="item" />
              <span class="fw-semibold">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const produk = [
    { nama: 'Topup Koin', items: ['Ovale', 'Hita', 'Supermeet'] },
    { nama: 'Topup Game', items: ['Mobile Legend', 'Pubg Mobile'] },
    { nama: 'Topup Pulsa & Kuota', items: ['Pulsa', 'Kuota'] },
    { nama: 'Topup E-wallet', items: ['Dana', 'Ovo', 'Link'] }
  ]
  
  // Fungsi untuk dapatkan src gambar berdasarkan nama item
  const getImgSrc = (item) => {
    // Jika file gambarnya pakai spasi, bisa diganti jadi dash/underscore atau encodeURIComponent
    const fileName = item.toLowerCase().replace(/\s+/g, '-') + '.png'
    return `/icons/${fileName}`
  }
  </script>
  