<template>
  <div class="container">
    <div class="row">
      <div class="col is-6">
        <router-link class="nav is-project" to="/">Accueil</router-link>
      </div>
      <div class="col is-6 align-right">
        <router-link class="nav is-project" :to="randomProjectLink">Projet suivant</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      randomProjectLink: '/'
    };
  },
  mounted() {
    this.fetchProjects();
  },
  watch: {
    '$route': 'setRandomProject'
  },
  methods: {
    fetchProjects() {
      fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(data => {
          this.projects = data;
          this.setRandomProject();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    setRandomProject() {
      if (this.projects.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.projects.length);
        const randomProject = this.projects[randomIndex];
        this.randomProjectLink = `/projects/${randomProject.slug}`;
      }
    }
  }
};
</script>
