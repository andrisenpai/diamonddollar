<template>
    <div class="container my-2">
      <ClientOnly>
        <DashboardCarousel />
      </ClientOnly>
  
      <section class="text-center">
        <h2 class="my-2" style="font-size: var(--font-title);">Selamat datang</h2>
        <p style="font-size: var(--font-body);">Gunakan menu di bawah untuk menjelajahi fitur aplikasi.</p>
      </section>
  
      <MenuProduk />
    </div>
  </template>
  
  <script setup>
  import DashboardCarousel from '~/components/DashboardCarousel.vue'
  import MenuProduk from '~/components/MenuProduk.vue'
  </script>
  