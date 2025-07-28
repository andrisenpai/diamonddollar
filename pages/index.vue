<template>
    <div class="container my-3">
      <div class="info text-center text-dark bg-info">
      Kamu main ovale? yuk ikuti event berhadiah, Hadiah akan di bagikan tanggal 1 Agustus 2025 ! Yok spin sekarang juga ! <button class="btn btn-secondary" @click="goToPage()">Lucky wheel</button>
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
  const {ensureAuth} = useRequireAuth()
  const goToPage = () => {
  const path = `/spin-lucky-price`
  ensureAuth(() => {
    router.push(path)
  })
}
  </script>
  