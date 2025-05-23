<template>
    <div v-if="testimoniList.length">
  <h5>Testimoni Terbaru</h5>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(item, index) in testimoniList"
      :key="index"
    >
      ID: {{ item.id }}, Rp {{ item.nominal.toLocaleString('id-ID') }} ({{ item.status }})
    </li>
  </ul>
</div>

  </template>
  
  <script setup>
  const testimoniList = ref([])

  onMounted(async () => {
  try {
    const { data } = await useFetch('/api/testimoni')
    if (data.value?.data) testimoniList.value = data.value.data
    else console.warn("Data kosong:", data.value)
  } catch (e) {
    console.error("Gagal fetch testimoni:", e)
  }
})


  </script>
  
  <style scoped>
  .testimonial-box {
    background: #0a141e;
    color: #b1f2f7;
    border: 1px solid #b1f2f7;
    padding: 1rem;
    border-radius: 8px;
  }
  </style>
  