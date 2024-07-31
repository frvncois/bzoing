import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Lenis from 'lenis'



const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

const app = createApp(App)

requestAnimationFrame(raf)

app.use(router)

app.mount('#app')
