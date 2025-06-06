<template>
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <h2 class="text-xl font-bold mb-2">🎉 Selamat!</h2>
        <p class="text-base mb-4">
          Kamu mendapatkan:
        </p>
        <p class="text-lg font-semibold text-green-600">{{ prize }}</p>
  
        <slot name="extra" />
  
        <button
          @click="$emit('update:modelValue', false)"
          class="mt-6 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: Boolean,
    prize: {
      type: String,
      default: '',
    },
  })
  
  defineEmits(['update:modelValue'])
  </script>
  