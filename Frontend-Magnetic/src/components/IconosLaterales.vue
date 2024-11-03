<template>
    <div class="contenedor">
        <div v-if="isMobile">
            <IconoGoogle @eventoClick="devolverEstado()" icon="search" v-if="!buscarMovil"/>
            <IconoGoogle @eventoClick="devolverEstado()" icon="close" v-else/>
        </div>
        <IconoGoogle ruta="redes" icon="person"/>
        <IconoGoogle ruta="carrito" icon="shopping_cart"/>
        <IconoGoogle ruta="favoritos" icon="favorite"/>
        <IconoGoogle ruta="conctacto" icon="headphones"/>  
    </div>
</template>

<script setup>
/*Imports */
import { ref} from 'vue';

import IconoGoogle from './IconoGoogle.vue';
/*Props y Emits */
const props =defineProps({
    isMobile:{
        type:Boolean,
        default:false
    },
    buscarMovil:{
        type:Boolean,
        default:false
        }
})

const emit=defineEmits(["mostrarBuscar"])

const devolverEstado=()=>{
    emit("mostrarBuscar",props.buscarMovil)
}

</script>

<style  scoped>
.contenedor{
    display: flex;
    gap: 1rem;
}
.contenedor span{
    cursor: pointer;
}

@media(width <=600px){
    .contenedor{
        gap: .2rem;
    }
}

</style>