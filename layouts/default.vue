<template>
  <div>
    <Navbar />
    <div class="content">
      <NuxtPage style="padding-top: 90px"/>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import BottomNav from '~/components/BottomNav.vue';
</script>

<style lang="scss">
</style>
