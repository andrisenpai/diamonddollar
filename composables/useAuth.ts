// composables/useAuth.ts
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

export const useAuth = () => {
  const { supabase } = useSupabase()
  const userStore = useUserStore()

  const user = ref(null)

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (data?.user) {
      user.value = data.user
      userStore.setUser({ id: data.user.id, email: data.user.email })
    }

    return data.user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    user.value = null
    userStore.clearUser()
  }

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    const u = data?.user ?? null
    user.value = u

    if (u) {
      userStore.setUser({ id: u.id, email: u.email })
    } else {
      userStore.clearUser()
    }
  }

  // Supabase realtime session sync
  supabase.auth.onAuthStateChange((_event, session) => {
    const u = session?.user ?? null
    user.value = u

    if (u) {
      userStore.setUser({ id: u.id, email: u.email })
    } else {
      userStore.clearUser()
    }
  })

  return { user, login, logout, fetchUser }
}
