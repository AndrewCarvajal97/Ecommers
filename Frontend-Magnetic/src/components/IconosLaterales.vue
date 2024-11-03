<template>
    <div class="contenedor">
        <div v-if="isMobile">
            <span class="material-symbols-outlined" @click="mostrarBuscar" v-if="!buscarMovil">search</span>
            <span class="material-symbols-outlined" @click="mostrarBuscar" v-else>close</span>
        </div>
        <span class="material-symbols-outlined">person</span>
        <span class="material-symbols-outlined">shopping_cart</span>
        <span class="material-symbols-outlined">favorite</span>
        <span class="material-symbols-outlined">headphones</span>
        <span class="material-symbols-outlined">language</span>
    </div>
</template>

<script setup>
/*Imports */
import { ref } from 'vue';
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

const emit=defineEmits([mostrarBuscar])

const mostrarBuscar=()=>{
    return props.isMobile
}

</script>

<style  scoped>

</style>