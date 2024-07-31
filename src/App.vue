<template>
  <MainHeader v-if="!shouldHideHeader" />
  <RouterView />
  <AdminLogin v-if="showAdminPanel" @login-success="showAdminPanel = false" />
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const route = useRoute()
const showAdminPanel = ref(false)

const shouldHideHeader = computed(() => {
  return route.path.startsWith('/projects/') || route.path.startsWith('/admin/')  || route.path.startsWith('/preview')
})

const handleKeyDown = (event) => {
  if (event.metaKey && event.key === 'b') {
    event.preventDefault() 
    showAdminPanel.value = !showAdminPanel.value 
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleLoginSuccess = () => {
  showAdminPanel.value = false
}
</script>
