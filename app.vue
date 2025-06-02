<template>
  <div id="app-wrapper">
    <FloatingSquare />
    <NuxtLayout />
    <AuthModal />
  </div>
</template>

<style>
#app-wrapper {
  max-width: 500px;
  margin: 0 auto;
  color: #b1f2f7;
  min-height: 100vh;
  font-family: 'Source Code Pro', monospace;
  padding-bottom: 70px; /* biar gak ketutupan bottom nav */
}
</style>
