<template>
  <div class="contenedor" @click="cambiarEstadoSlider">
    <header>
      <NavbarWeb :slider="estadoSliderBar"/>
    </header>
    <section class="contenido">
      <RouterView />
    </section>
    <footer>

    </footer>
  </div>
  
</template>

<script setup>
/*Importaciones */
import { ref} from 'vue';
import NavbarWeb from './layouts/NavbarWeb.vue';

/*Estados */
const estadoSliderBar=ref(false)

/*Funciones */
const cambiarEstadoSlider=()=>{
  estadoSliderBar.value=!estadoSliderBar.value
}
</script>


<style scoped>
.contenedor{
  display: grid;
  height: 100dvh;
  grid-template-rows: auto 1fr auto;
}
.contenido{
min-height: 1000px;
}
header{
  width: 100%;
}
footer{
  min-height: 100px;
  background-color: aqua;
}

</style>