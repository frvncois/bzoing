<template>
    <div class="container is-admin">
      <router-link class="button is-add" to="/admin/new">Ajouter</router-link>
      <router-link 
        v-for="project in projects" 
        :key="project.id" 
        :to="`/admin/${project.slug}`"
        class="row is-project"
        @mouseover="handleMouseOver($event)"
        @mouseleave="handleMouseLeave"
      >
        <div class="col is-6">
          <h1>{{ project.title }}</h1>
        </div>
        <div class="col is-4">
          <h1>{{ project.category || 'No Category' }}</h1>
        </div>
        <div class="col is-2 align-right">
          <h1>{{ project.year || 'No Year' }}</h1>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getProjects } from '@/services/api';
  
  export default {
    setup() {
      const projects = ref([]);
  
      onMounted(async () => {
        try {
          const data = await getProjects();
          projects.value = data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });
  
      const handleMouseOver = (event) => {
        const projects = document.querySelectorAll('.is-project');
        projects.forEach(project => {
          if (project === event.currentTarget) {
            project.style.zIndex = '2';
            project.style.opacity = '1';
          } else {
            project.style.zIndex = '1';
            project.style.opacity = '0.25';
          }
        });
      };
  
      const handleMouseLeave = () => {
        const projects = document.querySelectorAll('.is-project');
        projects.forEach(project => {
          project.style.zIndex = '1';
          project.style.opacity = '1';
        });
      };
  
      return {
        projects,
        handleMouseOver,
        handleMouseLeave
      };
    }
  };
  </script>
  