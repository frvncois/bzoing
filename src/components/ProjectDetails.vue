<template>
  <div class="container" v-if="project">
    <div class="row">
      <div class="col is-6 inline">
        <div class="space-between"><h2>{{ project.title }}</h2><h2>{{ project.category }}</h2></div>
        <div class="align-right"><h2>{{ project.year }}</h2></div>
        <p>{{ project.intro }}</p><br>
        <p>{{ project.details }}</p>
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
