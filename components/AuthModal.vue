<!-- components/AuthModal.vue -->
<template>
  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content robot-ui shadow-lg">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="authModalLabel">
            {{ isLogin ? '🚀 Login' : '🧪 Register' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetForm"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit" class="d-grid gap-3">
            <!-- 👇 hanya muncul saat Register -->
<input
  type="text"
  v-model="nama"
  class="form-control robot-input"
  placeholder="🧑 Nama Lengkap"
  required
  v-if="!isLogin"
/>
<input
  type="text"
  v-model="noHp"
  class="form-control robot-input"
  placeholder="📱 No HP"
  required
  v-if="!isLogin"
/>

            <input
              type="email"
              v-model="email"
              class="form-control robot-input"
              placeholder="🤖 Email"
              required
              autofocus
            />
            <input
              type="password"
              v-model="password"
              class="form-control robot-input"
              placeholder="🔑 Password"
              required
            />

            <button type="submit" class="btn btn-primary w-100 robot-btn" :disabled="isLoading">
              {{ isLogin ? '🔓 Login' : '🧠 Register' }} <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>

            </button>

            <div class="text-center text-muted">or</div>

            <button type="button" class="btn btn-outline-secondary w-100 disabled" @click="signInWithGoogle">
              🔗 Login with Google <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>

            </button>
          </form>

          <div v-if="error" class="mt-3 text-danger text-center">{{ error }}</div>
        </div>

        <div class="modal-footer border-0 justify-content-center">
          <small>
            {{ isLogin ? "Belum punya akun?" : "Sudah punya akun?" }}
            <a href="#" class="text-primary" @click.prevent="toggleForm">
              {{ isLogin ? "Register yuk" : "Login aja" }}
            </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
const { login, logout } = useAuth()

import { useUserStore } from '~/stores/user'
import { useNuxtApp } from '#app'

const { $bootstrap } = useNuxtApp()
const { supabase } = useSupabase()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const nama = ref('')
const noHp = ref('')

const error = ref('')
const isLoading = ref(false)

const user = useUserStore()

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  try {
  let userData

  if (isLogin.value) {
    userData = await login(email.value, password.value)
  } else {
    const { data, error: err } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (err) throw err
  userData = data.user

  // Tambahkan data ke tabel profiles
  if (userData) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userData.id,
      nama: nama.value,
      no_hp: noHp.value,
      jumlah_spin: 0,
    })
    if (profileError) throw profileError
  }
  }

  if (userData) {
    closeModal()
    resetForm()
  }
} catch (err: any) {
  error.value = err.message || 'Login/Register gagal'
} finally {
  isLoading.value = false
}

}


const signInWithGoogle = async () => {
  error.value = ''
  const { error: err } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  if (err) {
    error.value = err.message
  }
}

const toggleForm = () => {
  isLogin.value = !isLogin.value
  error.value = ''
}

  const resetForm = () => {
  email.value = ''
  password.value = ''
  nama.value = ''
  noHp.value = ''
  error.value = ''
  isLogin.value = true
}


const closeModal = () => {
  if (process.client) {
    const modalEl = document.getElementById('authModal')
    if (modalEl) {
      const modalInstance = $bootstrap.Modal.getInstance(modalEl) || new $bootstrap.Modal(modalEl)
      modalInstance.hide()
    }
  }
}
</script>


<style scoped>
.robot-ui {
  background: linear-gradient(145deg, #0f1924, #1a2735);
  border: 1px solid #1e2f3e;
  border-radius: 1rem;
  color: #b1f2f7;
  box-shadow: 0 0 20px rgba(177, 242, 247, 0.1);
  font-family: 'Orbitron', sans-serif;
}

.robot-input {
  background-color: #121e2d;
  border: 1px solid #1c2b3a;
  color: #b1f2f7;
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 0.6rem 1rem;
}

.robot-input::placeholder {
  color: #6c9daf;
}

.robot-input:focus {
  border-color: #00ffff;
  box-shadow: 0 0 0 0.25rem rgba(0, 255, 255, 0.15);
  background-color: #0a141e;
  color: #ffffff;
}

.robot-btn {
  background: linear-gradient(to right, #00d9ff, #00f2ff);
  border: none;
  color: #0a141e;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.robot-btn:hover {
  background: linear-gradient(to right, #00a6ff, #00e5ff);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
}

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

.modal-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  color: #00f2ff;
  letter-spacing: 1px;
}

.text-muted {
  color: #6c9daf !important;
}

a.text-primary {
  color: #00e1ff !important;
}

a.text-primary:hover {
  text-decoration: underline;
}
</style>

