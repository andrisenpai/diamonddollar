<template>
    <div class="container mt-3">
      <div class="logo-section">
        <img src="/icons/free-fire.png" class="mb-2" alt="Free Fire Logo" />
        <p class="subtitle">
          Top Up dan Jasa Joki Game Free Fire,<br />
          Temukan produk terbaik yang ramah di kantongmu!
        </p>
      </div>
  
      <div class="selection-row">
        <div class="selection-card" @click="selectOption('topup')">
          <!-- <img src="/icons/topup.png" alt="Top Up Icon" /> -->
          <span>Top Up</span>
        </div>
        <div class="selection-card" @click="selectOption('joki')">
          <!-- <img src="/icons/joki.png" alt="Joki Icon" /> -->
          <span>Joki</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const selectOption = (type) => {
    if (type === 'topup') {
      navigateTo('/free-fire-topup/topup') // sesuaikan dengan route kamu
    } else {
      navigateTo('/free-fire-topup/joki') // sesuaikan dengan route kamu
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: auto;
    background: #0a141e;
    color: #b1f2f7;
    padding: 1rem;
    min-height: 100vh;
  }
  
  .logo-section {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo-section img {
    max-width: 150px;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 14px;
    color: #b1f2f7;
  }
  
  .selection-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .selection-card {
    background-color: #13212f;
    border: 2px solid #00d4ff;
    border-radius: 10px;
    flex: 1;
    min-width: 45%;
    text-align: center;
    padding: 1.2rem;
    color: #b1f2f7;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  
  .selection-card:hover {
    background-color: #00d4ff;
    color: #0a141e;
  }
  
  .selection-card img {
    max-width: 60px;
    margin-bottom: 0.5rem;
  }
  </style>
  