export default defineNuxtRouteMiddleware(async (to, from) => {

  const auth = useAuthStore()

  if (to.name !== 'login' && !auth.isAuthentticated) {
    return navigateTo('/login')
  }
})
