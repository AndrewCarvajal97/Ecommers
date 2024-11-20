<template>
    <nav :class="{ menuSuperior: true, active: buscarMovil }">
      <section class="superior">
        <div class="menu" v-if="isMobile" >
            <span class="material-symbols-outlined" @click="abrirSider()">menu</span>
            <NavbarMovil :class="{'siderBar':true, 'activo':Sider}" @ocultarSider="abrirSider" :listaSecciones="listaSecciones" :objetoCategorias="objetoCategorias" :categorias="categorias" />
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
      <section class="inferior" v-if="!isMobile">
        <div class="categorias" v-for="(categoria, index) in objetoCategorias" :key="index"  >
          <BurbujaMenu :categoria="index" :Imagen="categoria.imagen" @mouseenter="MostrarSecciones(index)"  />
        </div>
      </section>
      <div v-for="(categoria, index) in objetoCategorias" :key="index"  @mouseleave="MostrarSecciones('')">
            <seccionesMenuInferior 
            :novedades="objetoCategorias[index].Novedades" 
            :ofertas="objetoCategorias[index].Ofertas" 
            :exclusivas="objetoCategorias[index].Exclusivas" 
            :Nuevos="objetoCategorias[index].Nuevos"
            :categoriaActual="categoriaActual"
            v-if="index===categoriaActual"/>
      </div>
    </nav>
    <div :class="{'cerrar-container':true}" v-if="isMobile">
      <div :class="{'cerrar':true,'visto':Sider}"  >
        <IconoGoogle @click="abrirSider()" icon="first_page" />
      </div>
    </div>
  </template>
  
  <script setup>
  /* Imports */
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import ComponenteBuscar from '../components/ComponenteBuscar.vue';
  import IconosLaterales from '../components/IconosLaterales.vue';
  import LogoSuperior from '../components/LogoSuperior.vue';
  import NavbarMovil from './NavbarMovil.vue';
  import IconoGoogle from '../components/IconoGoogle.vue';
  import {listaSecciones,objetoCategorias , categorias} from '../assets/Data.js'
  import BurbujaMenu from '../components/BurbujaMenu.vue';
  import seccionesMenuInferior from '../components/seccionesMenuInferior.vue';
  

   /*props */
   const props =defineProps({
    slider:{
      type:Boolean,
      default:false
    }
  })
  
  /* Estados */
  const categoriaActual=ref('')
  const buscarMovil = ref(false);
  const Sider=ref(props.slider)
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
  const numeros = ["Todo","Mujer","Curvy","Niños","Hombre","Hogar","Belleza"];
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
  
  const MostrarSecciones=(seccion)=>{
    categoriaActual.value=seccion
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
    background-color: transparent;
    overflow: scroll;
    scrollbar-width: none;
    display: flex;
    justify-content: space-around;
    margin: .5rem auto;
    gap: 1rem;
  }
  .menu{
    margin:0 10px;
  }

  .cerrar-container {
    position: fixed;
    left: 55%;
    top: 50%;
    transform: translateX(-1200px); /* Añadido un valor por defecto */
  }
  .cerrar-container .visto {
      transform: translateX(1200px);
      transition: all 1s ease;
  /* Mueve el elemento 100px a la derecha */
  }
  .enlace{
    text-decoration: none;
    color: inherit;
  }
  .categorias{
    cursor: pointer;
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
  