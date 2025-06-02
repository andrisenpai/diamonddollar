// composables/useRequireAuth.ts
import { useUserStore } from '~/stores/user'

export const useRequireAuth = () => {
  const user = useUserStore()

  const ensureAuth = (callback: () => void) => {
    
const { $bootstrap } = useNuxtApp()
    if (user.isAuthentic) {
      callback()
    } else {
      // Show modal auth
      const modal = document.getElementById('authModal')
      if (modal) {
        const bootstrapModal = $bootstrap.Modal.getInstance(modal) || new $bootstrap.Modal(modal)
        bootstrapModal.show()
      }
    }
  }

  return { ensureAuth }
}
