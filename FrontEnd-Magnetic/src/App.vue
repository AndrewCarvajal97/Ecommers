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
import Navbar from './components/Navbar.vue';  
</script>

<style scoped>

</style>