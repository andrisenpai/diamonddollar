import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  
  state: (): {
    id: string | null
    email: string | null
    isAuthentic: boolean
    role: string | null
  } => ({
    id: null,
    email: null,
    isAuthentic: false,
    role: null
  }),

  actions: {
    setUser(user: { id: string; email: string, role: string }) {
      this.id = user.id
      this.email = user.email
      this.isAuthentic = true
      this.role = this.role
    },

    clearUser() {
      this.id = null
      this.email = null
      this.isAuthentic = false
      this.role = null
    }
  },
  persist: true
})
