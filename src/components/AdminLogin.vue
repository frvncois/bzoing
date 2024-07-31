<template>
  <div class="admin is-wrap">
    <form class="admin is-login" @submit.prevent="handleLogin">
      <input type="text" id="username" placeholder="Username" v-model="username" required />
      <input type="password" id="password" placeholder="Password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')

const router = useRouter()

const handleLogin = () => {
  if (username.value && password.value) {
    router.push('/admin')
    emit('login-success')
  }
}
</script>
