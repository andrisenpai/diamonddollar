<template>
    <div v-if="user && profile" class="profile-card mt-5">
      <h5 class="profile-title">👤 Profil Pengguna</h5>
      <div class="profile-item">
        <span>📧 Email</span>
        <span>{{ user.email }}</span>
      </div>
      <div class="profile-item">
        <span>📛 Nama</span>
        <span>{{ profile.nama || '-' }}</span>
      </div>
      <div class="profile-item">
        <span>📱 No. HP</span>
        <span>{{ profile.no_hp || '-' }}</span>
      </div>
      <div class="profile-item">
        <span>🎰 Jumlah Spin</span>
        <nuxt-link to="/spin-lucky-price" class="btn btn-outline-secondary" :class="profile.jumlah_spin < 1 ? 'disabled' : ''" >{{profile.jumlah_spin}} Spin Sekarang</nuxt-link>
    </div>
    <small class="d-inline-block text-uppercase text-center">Tidak ada kesempatan spin, lakukan transaksi untuk mendapatkan spin</small>
    </div>
    
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useSupabase } from '~/composables/useSupabase' // pastikan kamu punya ini
  
  const { supabase } = useSupabase()
  
  const user = ref<any>(null)
  const profile = ref<any>(null)
  
  onMounted(async () => {
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser()
  
    if (userError || !currentUser) return
  
    user.value = currentUser
  
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single()
  
    if (!error) {
      profile.value = data
    } else {
      console.error('Gagal memuat profil:', error.message)
    }
  })
  </script>
  
  <style scoped>
  .btn-outline-secondary {
  border: 1px solid #00d9ff;
  color: #00d9ff;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background-color: #00d9ff;
  color: #0a141e;
}

.profile-card {
  background-color: #121e2d;
  border: 1px solid #1c2b3a;
  border-radius: 12px;
  padding: 1.5rem;
  color: #b1f2f7;
  box-shadow: 0 0 10px rgba(177, 242, 247, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 15px rgba(177, 242, 247, 0.3);
}

.profile-title {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: #b1f2f7;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #1c2b3a;
  font-size: 0.95rem;
}

.profile-item:last-child {
  border-bottom: none;
}
</style>

  