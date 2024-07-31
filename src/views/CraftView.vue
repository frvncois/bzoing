<template>
    <div id="app" data-v-app>
      <div class="container is-project">
        <div class="row">
          <div class="col is-6">
            <input class="admin is-title" type="text" v-model="project.title" placeholder="Title" />
          </div>
          <div class="col is-6 space-between">
            <input class="admin is-title" type="text" v-model="project.category" placeholder="Category" />
            <input class="admin is-title" type="text" v-model="project.year" placeholder="Year" />
          </div>
        </div>
      </div>
  
      <div class="container is-gallery">
        <div class="row">
          <div class="col is-6">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[0]" type="file" @change="uploadImage($event, 0)" />
              <img v-else :src="project.gallery[0]" class="placeholder is-img" />
              <button v-if="project.gallery[0]" @click="deleteImage(0)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-6">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[1]" type="file" @change="uploadImage($event, 1)" />
              <img v-else :src="project.gallery[1]" class="placeholder is-img" />
              <button v-if="project.gallery[1]" @click="deleteImage(1)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-12">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[2]" type="file" @change="uploadImage($event, 2)" />
              <img v-else :src="project.gallery[2]" class="placeholder is-img" />
              <button v-if="project.gallery[2]" @click="deleteImage(2)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-8">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[3]" type="file" @change="uploadImage($event, 3)" />
              <img v-else :src="project.gallery[3]" class="placeholder is-img" />
              <button v-if="project.gallery[3]" @click="deleteImage(3)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-4">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[4]" type="file" @change="uploadImage($event, 4)" />
              <img v-else :src="project.gallery[4]" class="placeholder is-img" />
              <button v-if="project.gallery[4]" @click="deleteImage(4)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-6">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[5]" type="file" @change="uploadImage($event, 5)" />
              <img v-else :src="project.gallery[5]" class="placeholder is-img" />
              <button v-if="project.gallery[5]" @click="deleteImage(5)" class="is-delete">×</button>
            </div>
          </div>
          <div class="col is-6">
            <div class="placeholder is-wrap">
              <input v-if="!project.gallery[6]" type="file" @change="uploadImage($event, 6)" />
              <img v-else :src="project.gallery[6]" class="placeholder is-img" />
              <button v-if="project.gallery[6]" @click="deleteImage(6)" class="is-delete">×</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container">
        <div class="row">
          <div class="col is-6 inline">
            <div class="space-between">
              <input class="admin is-subtitle" type="text" v-model="project.title" placeholder="Title" />
              <input class="admin is-subtitle" type="text" v-model="project.category" placeholder="Category" />
            </div>
            <div class="align-right">
              <input class="admin is-subtitle" type="text" v-model="project.year" placeholder="Year" />
            </div>
            <textarea class="admin is-content" v-model="project.intro" placeholder="Introduction"></textarea>
            <br>
            <textarea class="admin is-content" v-model="project.details" placeholder="Details"></textarea>
          </div>
        </div>
      </div>
  
      <div class="container">
        <div class="row">
          <div class="col is-6">
            <button @click="saveProject" class="button is-add">Save</button>
          </div>
          <div class="col is-6 align-right">
            <a href="/admin" class="nav is-project">Retour</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getProjectBySlug, addProject, updateProject, uploadFile } from '@/services/api';
  
  export default {
    setup() {
      const project = ref({
        title: '',
        intro: '',
        details: '',
        cover: '',
        gallery: [],
        year: '',
        category: '',
        publish: 1 
      });
      const route = useRoute();
      const router = useRouter();
  
      const fetchProject = async () => {
        if (route.params.slug !== 'new') {
          try {
            const projectSlug = route.params.slug;
            project.value = await getProjectBySlug(projectSlug);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      };
  
      const saveProject = async () => {
        try {
          if (route.params.slug === 'new') {
            await addProject(project.value);
            alert('Project created successfully!');
          } else {
            await updateProject(project.value.id, project.value);
            alert('Project updated successfully!');
          }
          router.push('/admin');
        } catch (error) {
          console.error('Error saving project:', error);
          alert('Failed to save the project.');
        }
      };
  
      const uploadImage = async (event, index) => {
        const file = event.target.files[0];
        if (file) {
          try {
            const response = await uploadFile(file);
            project.value.gallery[index] = response.url;
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
      };
  
      const deleteImage = (index) => {
        project.value.gallery.splice(index, 1);
      };
  
      fetchProject();
  
      return {
        project,
        saveProject,
        uploadImage,
        deleteImage
      };
    }
  };
  </script>
  

  