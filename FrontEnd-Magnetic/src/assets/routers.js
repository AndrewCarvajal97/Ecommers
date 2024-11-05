import { createWebHistory, createRouter } from 'vue-router'

import Magnetic from '../views/Magnetic.vue'
import DetalleProducto from '../views/DetalleProducto.vue'
import Categoria from '../layouts/Categoria.vue'

const routes = [
  { path: '/', component: Magnetic },
  {path:'/categoria/:name',component:Categoria},
  {path:'/categoria/:name/:seccion/:tipo',component:Categoria},
  { path: '/Product/:id', component: DetalleProducto },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})