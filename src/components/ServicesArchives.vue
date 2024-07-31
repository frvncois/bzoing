<template>
  <div class="container">
    <div class="row is-tight">
      <div 
        class="col is-2 align-right inline" 
        v-for="archive in archives" 
        :key="archive.title"
        @mouseover="showCover(archive.title)"
        @mouseleave="hideCover"
      >
        <span class="archives is-title">{{ archive.title }}</span>
        <span class="archives is-category">{{ archive.category }}</span>
        <div v-if="hoveredArchive === archive.title" class="archives is-cover"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const archives = ref([]);
    const hoveredArchive = ref(null);

    const fetchArchives = async () => {
      try {
        const response = await fetch('/database.json');
        const data = await response.json();
        archives.value = data.archives;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const showCover = (title) => {
      hoveredArchive.value = title;
    };

    const hideCover = () => {
      hoveredArchive.value = null;
    };

    fetchArchives();

    return {
      archives,
      hoveredArchive,
      showCover,
      hideCover
    };
  }
};
</script>
