import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import RecreationsView from '../views/RecreationsView.vue'
import AdminView from '../views/AdminView.vue'
import CraftView from '../views/CraftView.vue'
import PreviewView from '../views/PreviewDev.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView
    },
    {
      path: '/recreations',
      name: 'recreations',
      component: RecreationsView
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: ProjectsView
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView
    },
    {
      path: '/preview',
      name: 'Preview',
      component: PreviewView
    },
    {
      path: '/admin/:slug',
      name: 'craft',
      component: CraftView
    },
  ]
})

export default router
