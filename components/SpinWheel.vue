<template>
    <div class="spin-wrapper">
      
      <h2 class="title">Spin Hadiah</h2>
      <p v-if="result" class="result">🎉 Kamu dapat: <strong>{{ result }}</strong></p>
      <div class="wheel-container">
        <div class="wheel" :style="{ transform: `rotate(${rotation}deg)` }">
          <div
            v-for="(prize, index) in prizes"
            :key="index"
            class="label"
            :style="getLabelStyle(index)"
          >
            {{ prize }}
          </div>
        </div>
        <div class="pointer"></div>
      </div>
      <button class="spin-button" @click="spin" :disabled="spinning">
        {{ spinning ? 'Memutar...' : 'SPIN SEKARANG' }}
      </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <p v-if="result" class="result">🎉 Kamu dapat: <strong>{{ result }}</strong> {{ name }}</p>
            <img src="/monyet.jpg" class="img-fluid rounded w-50" alt="">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Spin Ulang</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { $bootstrap } = useNuxtApp()
import { ref } from 'vue'
function showPrizeModal(newPrize) {
  prize.value = newPrize
  modalOpen.value = true
}
const prizes = [
  'Koin 500K',
  'Coba Lagi',
  'Koin 1M',
  'Coba Lagi',
  'Koin 100K',
  'Coba Lagi',
]
const probabilities = [0, 35, 0, 35, 0.01, 30]
const spinning = ref(false)
const result = ref('')
const rotation = ref(0)

const segmentAngle = 360 / prizes.length
const showModal = () => {
  if (process.client) {
    const modalEl = document.getElementById('staticBackdrop')
    if (modalEl) {
      const modalInstance = $bootstrap.Modal.getInstance(modalEl) || new $bootstrap.Modal(modalEl)
      modalInstance.show()
    }
  }
}
function getRandomIndexByProbability(probs) {
  const random = Math.random() * 100
  let sum = 0
  for (let i = 0; i < probs.length; i++) {
    sum += probs[i]
    if (random < sum) return i
  }
  return probs.length - 1 // fallback
}
function spin() {
  if (spinning.value) return
  spinning.value = true
  result.value = ''

  const winnerIndex = getRandomIndexByProbability(probabilities)
  const fullSpins = 6

  // Normalisasi posisi rotasi saat ini (0-360)
  const currentRotation = rotation.value % 360

  // Sudut tengah segmen hadiah pemenang
  const prizeAngle = winnerIndex * segmentAngle + segmentAngle / 2

  // Hitung jarak sudut putaran supaya pointer berhenti tepat di prizeAngle
  let delta = 360 - prizeAngle - currentRotation
  if (delta < 0) delta += 360

  // Total putaran = putaran penuh + delta koreksi posisi akhir
  const totalRotation = fullSpins * 360 + delta

  rotation.value += totalRotation

  setTimeout(() => {
    result.value = prizes[winnerIndex]
    spinning.value = false
    showModal()
  }, 5000) // Pastikan durasi ini sesuai dengan CSS transition
}

function getLabelStyle(index) {
  const angle = segmentAngle * index + segmentAngle / 2
  return {
    transform: `rotate(${angle}deg) translateY(-100px) rotate(-${angle}deg)`,
    fontSize: '12px',
    
    width: '90px',
    whiteSpace: 'nowrap',
  }
}
</script>

  
  <style scoped>
  .spin-wrapper {
    max-width: 300px;
    margin: 1rem auto;
    /* background: #031e2f; */
    color: white;
    /* padding: 1.5rem; */
    border-radius: 1rem;
    /* box-shadow: 0 0 15px cyan; */
    text-align: center;
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px cyan;
  }
  
  .wheel-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
  }
  
  .wheel {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    transition: transform 5s cubic-bezier(0.33, 1, 0.68, 1);
    background: conic-gradient(
      #00ffff 0deg 60deg,
      #000 60deg 120deg,
      #ff0044 120deg 180deg,
      #000 180deg 240deg,
      green 240deg 300deg,
      #000 300deg 360deg
    );
    box-shadow: 0 0 12px cyan;
    overflow: visible;
  }
  
  .label {
    position: absolute;
    left: 35%;
    top: 47%;
    transform-origin: center;
    text-align: center;
    color: white;
    text-shadow: 0 0 4px black;
    white-space: nowrap;
    user-select: none;
  }
  
  .pointer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 22px solid #00ffff;
    filter: drop-shadow(0 0 5px cyan);
  }
  
  .spin-button {
    margin-top: 1rem;
    background: cyan;
    color: #0a141e;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 0 10px cyan;
    transition: all 0.3s;
  }
  
  .spin-button:hover:enabled {
    background: #00e0ff;
    box-shadow: 0 0 20px cyan;
  }
  
  .spin-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .result {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: #ffffff;
    text-shadow: 0 0 5px lime;
  }
  .modal-content {
  background: #111827; /* dark navy */
  color: #ffffff;
  border: 2px solid #06b6d4; /* cyan border */
  box-shadow: 0 0 20px #06b6d4; /* neon glow */
  border-radius: 12px;
}

.modal-body {
  text-align: center;
  padding: 2rem 1rem;
}

.modal-body .result {
  font-size: 1.25rem;
  color: #67e8f9; /* light cyan */
  text-shadow: 0 0 5px #22d3ee;
}

.modal-footer {
  border-top: 1px solid #0f172a;
  background-color: #0f172a;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.modal-footer .btn-secondary {
  background-color: #1e293b;
  color: #ffffff;
  border: 1px solid #334155;
}

.modal-footer .btn-secondary:hover {
  background-color: #334155;
}

.modal-footer .btn-primary {
  background-color: #06b6d4;
  border: none;
  color: #0f172a;
  font-weight: bold;
  box-shadow: 0 0 8px #22d3ee;
}

.modal-footer .btn-primary:hover {
  background-color: #22d3ee;
  color: #0f172a;
}
  </style>