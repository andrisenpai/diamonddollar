<template>
    <div class="container my-3">
      <div class="info text-center text-dark bg-info">
      Kamu main ovale? yuk ikuti event berhadiah, Hadiah akan di bagikan tanggal 1 Agustus 2025 ! Yok spin sekarang juga ! <nuxt-link to="/spin-lucky-price" class="btn btn-secondary">Lucky wheel</nuxt-link>
    </div>
      <ClientOnly>
        <DashboardCarousel />
      </ClientOnly>
      
      <section class="text-center">
      </section>
      <MenuProduk />
  
    </div>
  </template>
  
  <script setup>
  import DashboardCarousel from '~/components/DashboardCarousel.vue'
  import MenuProduk from '~/components/MenuProduk.vue'
  onMounted(() => {
    if (!useUserStore().isAuthentic) {
      
    }
  })
  </script>
  