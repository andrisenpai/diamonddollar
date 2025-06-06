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

            <button type="button" class="btn btn-outline-secondary w-100" @click="signInWithGoogle">
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
/* 🔧 Tema robotik Shinchan App */
.robot-ui {
  background: linear-gradient(145deg, #1e1e2f, #2b2b3c);
  border: 1px solid #4a4a5f;
  border-radius: 1rem;
  color: #d0d0ff;
}

.robot-input {
  background-color: #2a2a3c;
  border: 1px solid #505070;
  color: #fff;
}

.robot-input:focus {
  border-color: #71c7ec;
  box-shadow: 0 0 0 0.25rem rgba(113, 199, 236, 0.25);
}

.robot-btn {
  background: linear-gradient(to right, #6366f1, #3b82f6);
  border: none;
  color: white;
  font-weight: bold;
}

.robot-btn:hover {
  background: linear-gradient(to right, #4f46e5, #2563eb);
}
</style>
