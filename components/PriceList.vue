<template>
  <div class="price-list">
    <button
      v-for="nominal in nominalList"
      :key="nominal"
      type="button"
      class="price-item"
      :class="{ active: modelValue === nominal }"
      @click="$emit('update:modelValue', nominal)"
    >
      {{ nominal === 'custom' ? 'Custom' : `Rp ${format(nominal)}` }}
    </button>

    <input
      v-if="modelValue === 'custom'"
      v-model="formattedCustom"
      type="text"
      class="form-control mt-3 custom-input"
      placeholder="Masukkan nominal custom"
      @input="updateRaw()"
    />
  </div>
</template>

<script setup>
import { useRupiahInput } from '~/composables/useRupiahInput'

const props = defineProps({
  modelValue: String,
  nominalList: {
    type: Array,
    default: () => ['10000', '20000', '50000', '100000', 'custom']
  }
})

const emit = defineEmits(['update:modelValue', 'update:customValue'])

const {
  rawValue: customRaw,
  formattedValue: formattedCustom,
  getRawNumber
} = useRupiahInput('')

function updateRaw() {
  emit('update:customValue', customRaw.value)
}

function format(nominal) {
  return new Intl.NumberFormat('id-ID').format(nominal)
}
</script>

<style scoped>
.price-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-direction: column;
}

.price-item {
  border: 2px solid #0ff;
  background-color: transparent;
  color: #0ff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: 0.3s;
  font-weight: bold;
  box-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
  cursor: pointer;
}

.price-item:hover {
  background-color: rgba(0, 255, 255, 0.1);
}

.price-item.active {
  background-color: #0ff;
  color: #000;
  box-shadow: 0 0 10px #0ff, 0 0 20px #0ff;
}

.custom-input {
  border: 2px solid #0ff;
  box-shadow: 0 0 5px #0ff;
  background: #000;
  color: #0ff;
}
</style>
