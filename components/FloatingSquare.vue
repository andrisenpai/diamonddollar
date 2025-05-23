<template>
    <div class="neon-fire">
      <div
        class="particle"
        v-for="n in 30"
        :key="n"
        :style="randomStyle()"
      ></div>
    </div>
  </template>
  
  <script setup>
  const colorsHue = [180, 120, 0] // cyan, hijau, merah
  
  const randomStyle = () => {
    const size = Math.random() * 6 + 4
    const left = Math.random() * 100
    const delay = Math.random() * 50
    const duration = 3 + Math.random() * 3
    const hue = colorsHue[Math.floor(Math.random() * colorsHue.length)]
    const blur = Math.random() * 2 + 1.5
  
    return {
      width: `${size}px`,
      height: `${size * 1.2}px`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      background: `radial-gradient(circle at center, hsla(${hue}, 100%, 60%, 0.1) 0%, transparent 80%)`,
      boxShadow: `
        0 0 6px hsla(${hue}, 100%, 60%, 0.8),
        0 0 20px hsla(${hue}, 100%, 60%, 0.6),
        0 0 30px hsla(${hue}, 100%, 60%, 0.5)
      `,
      filter: `blur(${blur}px)`,
    }
  }
  </script>
  
  <style scoped>
  .neon-fire {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
    background: transparent;
  }
  
  .particle {
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    animation: riseParticle ease-in-out infinite;
    opacity: 0.1;
  }
  
  @keyframes riseParticle {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-120vh) scale(1.4);
      opacity: 0;
    }
  }
  </style>
  