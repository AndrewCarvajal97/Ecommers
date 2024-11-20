<template>
    <v-app>
    <div class="contenedor" @click="cambiarEstadoSlider">
      <header>
        <NavbarWeb :slider="estadoSliderBar" />
      </header>
      <section class="contenido">
        <ProductList />
        <CarritoDeCompra id="burbujaCarritoCompra"/>
      </section>
      <footer></footer>
    </div>
  </v-app>
</template>

<script setup>
/* Importaciones */
import { ref } from 'vue';
import NavbarWeb from './layouts/NavbarWeb.vue';
import ProductList from './components/ProductList.vue';
import CarritoDeCompra from './layouts/CarritoDeCompra.vue';
import Cart from './components/Cart.vue';

/* Estados */
const estadoSliderBar = ref(false);

/* Funciones */
const cambiarEstadoSlider = () => {
  estadoSliderBar.value = !estadoSliderBar.value;
};
</script>
<style scoped>
 #burbujaCarritoCompra{
  position: fixed;
  bottom: 50px;
  right: 50px;
 }
</style>