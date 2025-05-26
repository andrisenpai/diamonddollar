<template>
  <div class="neon-fire">
    <div
      class="floating-box"
      v-for="n in 12"
      :key="'box-' + n"
      :style="randomBoxStyle()"
    ></div>
  </div>
</template>

<script setup>
const randomBoxStyle = () => {
  const size = Math.random() * 40 + 40
  const left = Math.random() * 90
  const top = Math.random() * 90
  const duration = 4 + Math.random() * 3
  const delay = Math.random() * 3

  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}%`,
    left: `${left}%`,
    backgroundColor: `rgba(177, 242, 247, 0.08)`,
    border: `1px solid rgba(177, 242, 247, 0.25)`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    boxShadow: `
      0 0 6px rgba(177, 242, 247, 0.3),
      0 0 16px rgba(177, 242, 247, 0.2)
    `,
  }
}
</script>

<style scoped>
.neon-fire {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.floating-box {
  position: absolute;
  border-radius: 6px;
  animation: wiggleRotate ease-in-out infinite;
  opacity: 0.5;
  backdrop-filter: blur(1px);
}

@keyframes wiggleRotate {
  0% {
    transform: rotate(0deg) translate(0px, 0px) scale(1);
  }
  20% {
    transform: rotate(6deg) translate(4px, -4px) scale(1.05);
  }
  40% {
    transform: rotate(-6deg) translate(-4px, 4px) scale(0.97);
  }
  60% {
    transform: rotate(10deg) translate(3px, -2px) scale(1.04);
  }
  80% {
    transform: rotate(-10deg) translate(-3px, 3px) scale(1);
  }
  100% {
    transform: rotate(0deg) translate(0px, 0px) scale(1);
  }
}
</style>
