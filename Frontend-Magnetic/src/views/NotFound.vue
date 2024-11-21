<template>
    <v-container class="d-flex flex-column align-center justify-center text-center" style="height: 100vh;">
      <v-icon large class="mb-4">mdi-alert-circle-outline</v-icon>
      <h1>404</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <v-btn color="primary" @click="goHome">Volver a la página principal</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style scoped>
  h1 {
    font-size: 6rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  </style>
  