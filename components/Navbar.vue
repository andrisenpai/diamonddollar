<template>
    <nav class="robot-navbar fixed-top">
      <div class="nav-container">
        <span class="navbar-title">🤖 Shinchan App</span>
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
  .robot-navbar {
    max-width: 500px;
    margin: 0 auto;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    color: #b1f2f7;
    font-family: 'Source Code Pro', monospace, monospace;
    box-shadow: 0 4px 15px rgba(0, 255, 240, 0.25);
    border-radius: 8px;
    padding: 0.75rem 1rem;
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
    padding: 0.8rem 1.2rem;
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
  