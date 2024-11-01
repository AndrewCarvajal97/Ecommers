import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './assets/routers'

createApp(App)
.use(router)
.mount('#app')
