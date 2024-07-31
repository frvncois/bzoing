<template>
    <div class="container is-gallery" v-if="project">
      <div class="row">
        <div class="col is-6">
          <div class="placeholder is-wrap" v-if="project.gallery[0]">
            <img :src="project.gallery[0]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-6">
          <div class="placeholder is-wrap" v-if="project.gallery[1]">
            <img :src="project.gallery[1]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-12">
          <div class="placeholder is-wrap" v-if="project.gallery[2]">
            <img :src="project.gallery[2]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-8">
          <div class="placeholder is-wrap" v-if="project.gallery[3]">
            <img :src="project.gallery[3]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-4">
          <div class="placeholder is-wrap" v-if="project.gallery[4]">
            <img :src="project.gallery[4]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-6">
          <div class="placeholder is-wrap" v-if="project.gallery[5]">
            <img :src="project.gallery[5]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
        <div class="col is-6">
          <div class="placeholder is-wrap" v-if="project.gallery[6]">
            <img :src="project.gallery[6]" class="placeholder is-img" />
          </div>
          <div class="placeholder" v-else></div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        project: null
      };
    },
    watch: {
      '$route.params.slug': 'fetchProject'
    },
    mounted() {
      this.fetchProject();
    },
    methods: {
      fetchProject() {
        const projectSlug = this.$route.params.slug;
        fetch(`http://localhost:3000/projects/${projectSlug}`)
          .then(response => response.json())
          .then(data => {
            this.project = data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }
  };
  </script>
  <style scoped>
  .placeholder.is-wrap {
    position: relative;
  }
  .placeholder.is-img {
    width: 100%;
    height: 100%;
  }
  </style>
  