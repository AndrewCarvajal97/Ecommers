import { createWebHistory, createRouter } from 'vue-router'

import Magnetic from '../views/Magnetic.vue'
import DetalleProducto from '../views/DetalleProducto.vue'

const routes = [
  { path: '/', component: Magnetic },
  { path: '/Product/:id', component: DetalleProducto },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})