// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router'

// Rutas principales con lazy loading
const routes = [
  { 
    path: '/', 
    name: 'home',
    component: () => import('../views/Magnetic.vue') 
  },
  {
    path: '/categoria/:name/:seccion/:tipo',
    name: 'categoria',
    component: () => import('../layouts/Categoria.vue'),
    // Puedes añadir meta data para manejar permisos, títulos, etc
    meta: {
      title: 'Categorías',
      requiresAuth: false
    }
  },
  { 
    path: '/product/:id', 
    name: 'ProductDetail',
    component: () => import('../components/ProductDetail.vue'),
    // Props permite pasar los parámetros de ruta como props al componente
    props: true,
    meta: {
      title: 'Detalle de Producto'
    }
  },
  // Ruta para manejar 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  // Configuración adicional del router
  scrollBehavior(to, from, savedPosition) {
    // Si existe una posición guardada, vuelve a ella
    if (savedPosition) {
      return savedPosition
    }
    // De lo contrario, vuelve al inicio de la página
    return { top: 0 }
  }
})

// Navigation Guards globales
router.beforeEach((to, from, next) => {
  // Actualizar el título de la página
  document.title = to.meta.title ? `Magnetic - ${to.meta.title}` : 'Magnetic'
  
  // Aquí puedes agregar lógica de autenticación u otras validaciones
  next()
})

export default router