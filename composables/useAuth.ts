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

    const u = data?.user
    if (u) {
      const role = u.user_metadata?.role ?? 'user' // default role = user
      user.value = u
      userStore.setUser({ id: u.id, email: u.email, role })
    }

    return u
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
      const role = u.user_metadata?.role ?? 'user'
      userStore.setUser({ id: u.id, email: u.email, role })
    } else {
      userStore.clearUser()
    }
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    const u = session?.user ?? null
    user.value = u

    if (u) {
      const role = u.user_metadata?.role ?? 'user'
      userStore.setUser({ id: u.id, email: u.email, role })
    } else {
      userStore.clearUser()
    }
  })

  return { user, login, logout, fetchUser }
}
