<template>
    <div>
      <p>User is {{ user.email }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '~/stores/user'
  const user = useUserStore()
  </script>