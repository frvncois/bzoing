<template>
  <div class="container is-projects">
    <router-link 
      v-for="project in projects" 
      :key="project.id" 
      :to="`/projects/${project.slug}`"
      class="row is-project"
      @mouseover="handleMouseOver($event)"
      @mouseleave="handleMouseLeave"
    >
      <div class="col is-6">
        <h1>{{ project.title }}</h1>
        <div class="projects is-thumbnail" style="display: none;">
          <img :src="project.cover" alt="Cover Image" />
        </div>
      </div>
      <div class="col is-4">
        <h1>{{ project.category || 'No Category' }}</h1>
      </div>
      <div class="col is-2 align-right">
        <h1>{{ project.year || 'No Year' }}</h1>
      </div>
    </router-link>
    <router-link class="nav is-project" to="/services">Archives</router-link>
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
        const thumbnail = project.querySelector('.projects.is-thumbnail');
        if (project === event.currentTarget) {
          project.style.zIndex = '2';
          project.style.opacity = '1';
          if (thumbnail) {
            thumbnail.style.display = 'block';
          }
        } else {
          project.style.zIndex = '1';
          project.style.opacity = '0.25';
          if (thumbnail) {
            thumbnail.style.display = 'none';
          }
        }
      });
    };

    const handleMouseLeave = () => {
      const projects = document.querySelectorAll('.is-project');
      projects.forEach(project => {
        project.style.zIndex = '1';
        project.style.opacity = '1';
        const thumbnail = project.querySelector('.projects.is-thumbnail');
        if (thumbnail) {
          thumbnail.style.display = 'none';
        }
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