type User = {
  id?: number
  name?: string
  email?: string
  email_verified_at?: Date
  created_at?: Date
  updated_at?: Date
}

type RequestLoginBody = {
  email: string
  password: string
}

const encryptStorage = useEncryptStorage

export const useAuthStore = defineStore('auth-store', () => {

  // initial state
  const user: Ref<User | null> = ref(null)

  // getters
  const isAuthentticated = computed(() => !!user.value)

  // user login handler
  async function login(payload: RequestLoginBody) {

    await useFetchApi('/sanctum/csrf-cookie', { method: 'get' })

    const login = await useFetchApi('/login', { body: payload, method: 'post' })

    await fetchUser()

    return login
  }

  // user logged in
  async function fetchUser() {
    const userFetched = await useFetchApi('/api/user', { method: 'get' })
    user.value = userFetched.data?.value ?? null

    return userFetched
  }

  // destroy session
  function destroy() {

    user.value = null
  }

  return {
    user, login, fetchUser, isAuthentticated, destroy
  }
}, {
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'lax',
    })
  }
})
