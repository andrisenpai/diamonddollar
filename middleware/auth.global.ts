export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return
  
    const publicPages = ['/', '/login', '/register','/spin-lucky-price'] // Halaman yang tidak butuh login
  
    if (publicPages.includes(to.path)) return // Jangan blokir halaman publik
  
    const { supabase } = useSupabase()
    const { data } = await supabase.auth.getSession()
  
    const isAuthenticated = !!data.session?.user
  
    if (!isAuthenticated) {
      return navigateTo('/')
    }
  })
  