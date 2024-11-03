<template>
     <span class="material-symbols-outlined" @click="enrutar(ruta)">{{icon}}</span>
</template>

<script setup>
/*imports */
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
/*props y emits */
const props=defineProps({
     ruta:{
          type:String,
     },
     icon:{
          type:String,
          default:'',
     }

})
const emit=defineEmits(["eventoClick"])
/*declaraciones generales */
const router = useRouter();
/*funciones */
function enrutar(ruta) {
     if(ruta){
          router.replace(`/${ruta}`)
     }
     else{
          emit("eventoClick")
     }
}
</script>

<style  scoped>

</style>