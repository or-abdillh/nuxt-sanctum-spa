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

export const useAuthStore = defineStore('auth-store', () => {

  // initial state
  const user: Ref<User | any> = ref({})

  // get csrf cookie
  async function csrfCookie() {
    await useFetchApi('/sanctum/csrf-cookie', { method: 'get' })
  }

  // user login handler
  async function login(payload: RequestLoginBody) {
    // get cookie first
    await csrfCookie()
    return await useFetchApi('/login', { body: payload, method: 'post' })
  }

  // user logged in
  async function userProfile() {
    const { data } = await useFetchApi('/api/user', { method: 'get' })
    user.value = data?.value ?? {}
  }

  return {
    user, login, userProfile
  }
})
