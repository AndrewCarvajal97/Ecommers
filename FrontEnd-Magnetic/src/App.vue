<template>
  <header>
    <NavbarWeb/>
    
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
import NavbarWeb from './layouts/NavbarWeb.vue';
import NavbarMovil from './layouts/NavbarMovil.vue';

</script>

<style scoped>
header{
  width: 100%;
}

</style>