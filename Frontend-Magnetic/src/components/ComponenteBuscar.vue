<template>
    <div class="buscar" >
        <input type="text" placeholder="Buscar" v-model="palabraBusqueda"><button @click="EmitirPalabra(palabraBusqueda)" class="lupa"><span class="material-symbols-outlined">search</span></button>
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
const emit = defineEmits(['BuscarPalabra'])
/*Estados y Declaraciones generales*/
const route=useRoute()
const router=useRouter()
const palabraBusqueda=ref()
/* Funciones*/
const EmitirPalabra=(palabraBusqueda)=>{
    emit('BuscarPalabra',palabraBusqueda)
}

</script>

<style  scoped>
    .buscar{
        display: flex;
        align-items: center;
        justify-items: center;
        gap: 2rem;
    }
    .buscar input{
        width: 80%;
        height: 2rem;
    }
    .lupa{
        background-color: black;
        height: 2.4rem;
        box-sizing: border-box;
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