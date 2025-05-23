<template>
    <nav class="bottom-navbar" role="navigation" aria-label="Bottom navigation">
      <NuxtLink to="/" class="nav-item" aria-current="page" title="Home">
        <i class="bi bi-house-door-fill"></i>
        <span>Home</span>
      </NuxtLink>
      <NuxtLink to="/history" class="nav-item" title="Account">
        <i class="bi bi-clock-history"></i>
        <span>Account</span>
      </NuxtLink>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style>
  .bottom-navbar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    width: 100%;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    box-shadow: 0 -4px 15px rgba(0, 255, 240, 0.25);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0;
    border-radius: 12px 12px 0 0;
    font-family: 'Source Code Pro', monospace, monospace;
    z-index: 1000;
    user-select: none;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #b1f2f7;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    transition: color 0.3s ease;
  }
  
  .nav-item i {
    font-size: 1.4rem;
    margin-bottom: 0.15rem;
    filter: drop-shadow(0 0 1px #00fff7);
  }
  
  .nav-item:hover,
  .nav-item[aria-current="page"] {
    color: #00fff7;
    text-shadow: 0 0 5px #00fff7;
  }
  
  .nav-item:hover i,
  .nav-item[aria-current="page"] i {
    filter: drop-shadow(0 0 6px #00fff7);
  }
  </style>
  