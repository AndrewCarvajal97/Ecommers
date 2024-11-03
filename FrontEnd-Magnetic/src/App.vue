<template>
  <header>
    <Navbar/>
  </header>
  <section>
    <RouterView />
  </section>
  <footer>

  </footer>
</template>

<script setup>
/*Importaciones */
import { ref} from 'vue';
import Navbar from './components/NavbarWeb.vue';  
</script>

<style scoped>

</style>