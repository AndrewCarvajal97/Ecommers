<template>
    <nav :class="{ menuSuperior: true, active: buscarMovil }">
      <section class="superior">
        <div class="menu" v-if="isMobile">
            <span class="material-symbols-outlined" @click="abrirSider()">menu</span>
            <NavbarMovil :class="{'siderBar':true, 'activo':Sider}" @ocultarSider="abrirSider"  />
        </div>
        <div class="logo" v-if="!buscarMovil || !isMobile">
          <LogoSuperior :isMovil="isMobile" @emitirBuscar="eventoBuscarMovil()" />
        </div>
        <div class="buscar" v-if="buscarMovil || !isMobile">
          <ComponenteBuscar  :listaSugerencias="busquedasComunes" />
        </div>
        <div class="iconosLaterales">
            <IconosLaterales :isMobile="isMobile" :buscarMovil="buscarMovil" @mostrarBuscar="toggleBuscarMovil"/>
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
  import ComponenteBuscar from '../components/ComponenteBuscar.vue';
  import IconosLaterales from '../components/IconosLaterales.vue';
  import LogoSuperior from '../components/LogoSuperior.vue';
  import NavbarMovil from './NavbarMovil.vue';
  
  /* Estados */
  
  const buscarMovil = ref(false);
  const Sider=ref(false)
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
  const eventoBuscarMovil = () => {
    buscarMovil.value = !buscarMovil.value;
  };
  
  const toggleBuscarMovil = (estado) => {
    if (isMobile.value) {
      buscarMovil.value = !estado;
    }
  };
  const abrirSider=()=>{
    Sider.value=!Sider.value
  }
  
  
  </script>
  
  <style scoped>
  .menuSuperior {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 1rem 0;
  }
  .siderBar.activo{
    transform: translateX(0);
  }
  
  .superior {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
  }
  
  .logo {
    flex: 1;
    display: flex;
    justify-content: start;
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
    margin:0 10px;
  }
  
  @media (max-width: 600px) {
    .buscar {
      display: none;
      flex: 1;
      width: 90%;
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
  