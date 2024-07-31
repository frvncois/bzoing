<template>
  <div class="container is-project" v-if="project">
    <div class="row">
      <div class="col is-6">
        <h1>{{ project.title }}</h1>
      </div>
      <div class="col is-6 space-between">
        <h1>{{ project.category }}</h1>
        <h1>{{ project.year }}</h1>
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
