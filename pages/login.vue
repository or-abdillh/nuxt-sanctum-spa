<template>
    <NuxtLayout name="auth">
        <section class="mt-6 bg-white p-10 shadow-sm border rounded md:w-5/12">
            <span class="text-center text-green-500">
                <h1 class="text-4xl font-medium mb-2">Welcome Dojo Merch</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, libero!</p>
            </span>

            <form class="mt-6" @submit.prevent="handleLogin">
                <!-- email -->
                <div class="form--wrapper">
                    <label class="form--label" for="email">Email</label>
                    <input v-model="form.email" class="form--input" type="email" name="email" id="email" required placeholder="Type your email here" autocomplete="off">
                </div>

                <!-- password -->
                <div class="form--wrapper">
                    <label class="form--label" for="password">Password</label>
                    <input v-model="form.password" class="form--input" type="password" name="password" id="password" required placeholder="Type your username here" autocomplete="off">
                </div>

                <!-- action -->
                <button ref="button" type="submit" class="btn btn-primary w-full mb-6">Login</button>

                <!-- not have account -->
                <p class="mb-5 text-sm text-gray-500">Not have account ? <button type="button" class="text-green-500" >Click here</button> to register account</p>
            </form>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">

// composables
const app = useNuxtApp()
const router = useRouter()
const auth = useAuthStore()

// types
type Form = {
  email: string
  password: string
}

// body
const form: Ref<Form> = ref({
  email: 'test@example.com',
  password: 'password'
})

// DOM Element
const button = ref<HTMLButtonElement | null>(null)

// use notyf
const notyfError = app.$notyfError as any
const notyfSuccess = app.$notyfSuccess as any

// form handler
const handleLogin = async () => {

  button.value!.disabled = true
  button.value!.innerText = 'Loading ...'

  const { error } = await auth.login(form.value)
  await auth.userProfile()

  if (error.value) {
    console.log(error)
    notyfError(error.value)
  } else {
    notyfSuccess('Login berhasil!')
    navigateTo('/')
  }

  button.value!.disabled = false
  button.value!.innerText = 'Login'
}
</script>
