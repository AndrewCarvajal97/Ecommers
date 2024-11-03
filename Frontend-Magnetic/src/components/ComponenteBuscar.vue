<template>
    <div class="buscar" >
        <input type="text" placeholder="Buscar" v-model="palabraBusqueda" id="IngresoBuscar"><button @click="Busqueda(palabraBusqueda)" class="lupa"><span class="material-symbols-outlined">search</span></button>
    </div>
</template>

<script setup>
/*Importaciones */
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
/*Props */
const props=defineProps({
    listaSugerencias:{
        type:Array,
        default:[]
    }
})

/*Estados y Declaraciones generales*/
const route=useRoute()
const router=useRouter()
const palabraBusqueda=ref('')
/* Funciones*/
const Busqueda = (palabraBusqueda) => {
    if (palabraBusqueda === '') {
      router.replace({ path: '/' });
    } else {
      router.replace({ query: { buscar: palabraBusqueda } });
    }
  };

</script>

<style  scoped>
    .buscar{
        display: flex;
        align-items: center;
        justify-items: center;
        gap: .5rem;
    }
    .buscar input{
        width: 80%;
        height: 2rem;
    }
    .lupa{
        background-color: black;
        height: 2.4rem;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 20px;
    }
    .lupa span{
        color: white;
    }
    @media(width<=600px){
        .buscar{
            width: 100%;
            margin: auto;
            gap: 0;
        }
        .buscar input{
            width: 65%;
        }
    }
</style>