<template>
    <div class="container my-3">
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
    const counter = useCounterStore()
console.log(counter.count)
counter.increment()

  })
  </script>
  