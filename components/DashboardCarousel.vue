<template>
  <div id="carouselDashboard" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="item.image" class="d-block w-100" :alt="item.title" />
        <div class="carousel-caption d-none d-md-none d-lg-block">
          <h5>{{ item.title }}</h5>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselDashboard"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselDashboard"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</template>

<script setup>
const { data: items } = await useFetch('/api/carousel')
</script>


<style scoped>
.carousel-inner img {
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 255, 247, 0.2);
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.carousel-control-prev, .carousel-control-next{
  top: 20px!important;
}
</style>
