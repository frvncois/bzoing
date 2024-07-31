<template>
    <header class="container">
      <div class="row">
        <div class="col is-6">
          <router-link class="nav is-item" to="/">Bzoing</router-link>
        </div>
        <div class="col is-6 space-between">
          <router-link class="nav is-item" to="/">Projets</router-link>
          <router-link class="nav is-item" to="/services">Services</router-link>
          <router-link class="nav is-item" to="/recreations">Récréations</router-link>
          <a class="nav is-item" @click.prevent="showContact">Contact</a>
        </div>
      </div>
      <MainContact v-if="isContactVisible" @close="hideContact" />
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import MainContact from '@/components/MainContact.vue';
  
  const isContactVisible = ref(false);
  
  const showContact = () => {
    isContactVisible.value = true;
  };
  
  const hideContact = () => {
    isContactVisible.value = false;
  };
  </script>
  