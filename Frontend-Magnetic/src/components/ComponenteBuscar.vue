<!-- components/Search.vue -->
<template>
    <div class="buscar">
      <input 
        type="text" 
        placeholder="Buscar" 
        v-model="palabraBusqueda" 
        id="IngresoBuscar"
        @input="buscarEnTiempoReal"
        @keyup.enter="Busqueda()"
      >
      <button 
        @click="Busqueda()" 
        class="lupa"
      >
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  import { useProductStore } from '../stores/productStore.js';
  
  const productStore = useProductStore();
  
  const palabraBusqueda = ref('');
  
  const buscarEnTiempoReal = () => {
    if (palabraBusqueda.value.trim() === '') {
      productStore.clearSearch();
    } else {
      productStore.searchProducts(palabraBusqueda.value);
    }
  };
  
  const Busqueda = () => {
    if (palabraBusqueda.value.trim() === '') {
      productStore.clearSearch();
    } else {
      productStore.searchProducts(palabraBusqueda.value);
    }
  };
  
  // Opcional: Método para limpiar búsqueda
  const limpiarBusqueda = () => {
    palabraBusqueda.value = '';
    productStore.clearSearch();
  };
  </script>
  
  <style scoped>
  .buscar {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;
  }
  .buscar input {
    width: 80%;
    height: 2rem;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .lupa {
    background-color: black;
    height: 2.4rem;
    width: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius: 20px;
  }
  .lupa span {
    color: white;
  }
  @media (max-width: 600px) {
    .buscar {
      width: 100%;
      margin: auto;
      gap: 0;
    }
    .buscar input {
      width: 65%;
    }
  }
  </style>