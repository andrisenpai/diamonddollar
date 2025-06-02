import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  
  state: (): {
    id: string | null
    email: string | null
    isAuthentic: boolean
  } => ({
    id: null,
    email: null,
    isAuthentic: false,
  }),

  actions: {
    setUser(user: { id: string; email: string }) {
      this.id = user.id
      this.email = user.email
      this.isAuthentic = true
    },

    clearUser() {
      this.id = null
      this.email = null
      this.isAuthentic = false
    }
  },
  persist: true
})
