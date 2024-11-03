<template>
    <nav :class="{ menuSuperior: true, active: buscarMovil }">
      <section class="superior">
        <div class="menu" >
            <span class="material-symbols-outlined" v-if="isMobile">menu</span>
        </div>
        <div class="logo" v-if="!buscarMovil || !isMobile">
          <img src="/img/marcaPersonal/NEGRO SIN FONDO.webp" alt="Logo de la empresa" @click="volverInicio">
        </div>
        <div class="buscar" v-if="buscarMovil || !isMobile">
          <ComponenteBuscar @BuscarPalabra="Busqueda" :listaSugerencias="busquedasComunes" />
        </div>
        <div class="iconosLaterales">
            <div v-if="isMobile">
                <span class="material-symbols-outlined" @click="toggleBuscarMovil" v-if="!buscarMovil">search</span>
                <span class="material-symbols-outlined" @click="toggleBuscarMovil" v-else>close</span>
            </div>
          <span class="material-symbols-outlined">person</span>
          <span class="material-symbols-outlined">shopping_cart</span>
          <span class="material-symbols-outlined">favorite</span>
          <span class="material-symbols-outlined">headphones</span>
          <span class="material-symbols-outlined">language</span>
        </div>
      </section>
      <section class="inferior">
        <div class="categorias" v-for="(n, index) in numeros" :key="index">
          <RouterLink :to="`/Category/${n}`">categoria {{ n }}</RouterLink>
        </div>
      </section>
    </nav>
  </template>
  
  <script setup>
  /* Imports */
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import ComponenteBuscar from './ComponenteBuscar.vue';
  
  /* Estados */
  const categoria = ref();
  const router = useRouter();
  const buscarMovil = ref(false);
  const isMobile = ref(window.innerWidth <= 600);
  
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 600;
  };
  
  onMounted(() => {
    window.addEventListener('resize', updateIsMobile);
    updateIsMobile(); 
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile);
  });
  
  /* Data */
  const numeros = 8;
  const busquedasComunes = [
    "algo",
    "comounas",
    "estounas",
    "queunas",
    "seraunas",
    "unasca",
    "ejemplo"
  ];
  
  /* Funciones */
  const volverInicio = () => {
    buscarMovil.value = !buscarMovil.value;
    if (!buscarMovil.value) {
      router.replace('/');
    }
  };
  
  const toggleBuscarMovil = () => {
    if (isMobile.value) {
      buscarMovil.value = !buscarMovil.value;
    }
  };
  
  const Busqueda = (palabra) => {
    if (palabra.trim() === '') {
      router.replace({ path: '/' });
    } else {
      router.replace({ query: { buscar: palabra } });
    }
  };
  
  const mostrarSugerencias = (palabra) => {
    if (palabra.trim().length > 3) {
      const sugerencias = busquedasComunes.filter(sugerencia =>
        sugerencia.toLowerCase().includes(palabra.toLowerCase())
      );
      console.log(sugerencias);
      return sugerencias;
    }
    return [];
  };
  </script>
  
  <style scoped>
  .menuSuperior {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 1rem 0;
  }
  
  .superior {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0 1rem;
  }
  
  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .logo img {
    height: 30px;
  }
  
  .buscar {
    flex: 2;
    display: flex;
    justify-content: center;
  }
  
  .iconosLaterales {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .inferior {
    width: 90%;
    background-color: aqua;
    display: flex;
    justify-content: space-around;
    margin: 1rem auto;
    overflow: hidden;
    gap: 1rem;
  }
  .menu{
    margin-right: 20px;
  }
  
  @media (max-width: 600px) {
    .buscar {
      display: none;
    }
  
    .menuSuperior.active .buscar {
      display: flex;
    }
  
    .iconosLaterales {
      flex: 1;
      gap: .1rem;
    }
  
    .iconosLaterales span {
      font-size: 1rem;
    }
  
    .buscar-toggle {
      display: none;
    }
  
    .menuSuperior.active .buscar-toggle {
      display: flex;
      justify-content: center;
    }
  }
  </style>
  