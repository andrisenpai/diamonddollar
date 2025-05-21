<template>
    <nav class="robot-navbar fixed-top">
      <div class="nav-container">
        
        <span class="navbar-title">
          <img src="/images/logo.png" alt="Logo" class="logo drop-bounce" />
          <span class="app-name wave-text">
            <span v-for="(char, index) in 'Shinchan App'" :key="index">{{ char === ' ' ? '\u00A0' : char }}</span>
          </span>

        </span>

        <button
          class="menu-btn"
          @click="toggleMenu"
          :aria-expanded="menuVisible.toString()"
          aria-label="Toggle menu"
        >
          <span :class="['hamburger', { open: menuVisible }]"></span>
        </button>
      </div>
  
      <transition name="slide-fade">
        <div v-if="menuVisible" class="menu-list" role="menu">
          <NuxtLink to="/" class="nav-link">🏠 Home</NuxtLink>
          <NuxtLink to="/produk" class="nav-link">📦 Products</NuxtLink>
          <NuxtLink to="/akun" class="nav-link">👤 Account</NuxtLink>
        </div>
      </transition>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const menuVisible = ref(false)
  function toggleMenu() {
    menuVisible.value = !menuVisible.value
  }
  </script>
  
  <style scoped>
.logo {
  width: 64px;
  height: 64px;
  margin-right: 5px;
  vertical-align: middle;
}

/* Logo + teks efek drop-fade (drop-in + pause + fade-out) */
.drop-bounce {
  animation: dropFade 4s ease-in-out infinite;
}

/* Animasi drop + bounce + pause + fade out */
@keyframes dropFade {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  15% {
    transform: translateY(-10px);
  }
  20% {
    transform: translateY(0);
  }
  60% {
    /* Diam di posisi akhir, opacity penuh */
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    /* Fade out ke opacity 0 */
    transform: translateY(0);
    opacity: 0;
  }
}
.wave-text {
  display: inline-block;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 0.08em;
}

.wave-text span {
  display: inline-block;
  animation: wave 2.5s ease-in-out infinite;
}

/* Delay bergelombang per huruf */
.wave-text span:nth-child(1)  { animation-delay: 0s; }
.wave-text span:nth-child(2)  { animation-delay: 0.1s; }
.wave-text span:nth-child(3)  { animation-delay: 0.2s; }
.wave-text span:nth-child(4)  { animation-delay: 0.3s; }
.wave-text span:nth-child(5)  { animation-delay: 0.4s; }
.wave-text span:nth-child(6)  { animation-delay: 0.5s; }
.wave-text span:nth-child(7)  { animation-delay: 0.6s; }
.wave-text span:nth-child(8)  { animation-delay: 0.7s; }
.wave-text span:nth-child(9)  { animation-delay: 0.8s; }
.wave-text span:nth-child(10) { animation-delay: 0.9s; }

@keyframes wave {
  0%   { transform: translateY(0); }
  10%  { transform: translateY(-8px); }
  20%  { transform: translateY(0); }
  100% { transform: translateY(0); }
}


  .robot-navbar {
    max-width: 500px;
    margin: 5px auto!important;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    color: #b1f2f7;
    font-family: 'Source Code Pro', monospace, monospace;
    box-shadow: 0 4px 15px rgba(0, 255, 240, 0.25);
    border-radius: 8px;
    padding: 0.25rem 1rem;
    user-select: none;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-title {
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.1em;
    text-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
  }
  
  .menu-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 24px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
  }
  
  .hamburger,
  .hamburger::before,
  .hamburger::after {
    content: "";
    display: block;
    background: #00fff7;
    height: 3px;
    border-radius: 2px;
    transition: all 0.35s ease;
    position: absolute;
    width: 30px;
  }
  
  .hamburger {
    top: 50%;
    transform: translateY(-50%);
  }
  
  .hamburger::before {
    top: -10px;
  }
  
  .hamburger::after {
    top: 10px;
  }
  
  .hamburger.open {
    background: transparent;
  }
  
  .hamburger.open::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .hamburger.open::after {
    transform: rotate(-45deg);
    top: 0;
  }
  
  .menu-list {
    margin-top: 0.8rem;
    background: #142c38;
    border-radius: 6px;
    box-shadow: 0 6px 20px rgba(0, 255, 240, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .nav-link {
    padding: 0.5rem 1.2rem;
    color: #b1f2f7;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid #0e4b5e;
    transition: background-color 0.25s ease;
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .nav-link:hover {
    background: #00fff7;
    color: #142c38;
    text-shadow: none;
    box-shadow: inset 0 0 15px #00fff7;
  }
  
  /* Transition slide + fade */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.35s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  