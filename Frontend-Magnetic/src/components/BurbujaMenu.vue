<template>
    <div class="Burbuja">
        <div class="Imagen">
            <img :src="Imagen" :alt="Imagen">
        </div>
        <div>
            <h2>{{ categoria }}</h2>
        </div>
    </div>
</template>

<script setup>
/*Imports  */
import { ref } from 'vue';
/*Estados */

/*Props */
const props =defineProps({
    categoria:{
        type:String,
        default:""
    },
    Imagen:{
        type:String,
        default:""
    }
})
</script>

<style  scoped>
    .Burbuja{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .Imagen{
        width: 90px;
        height: 90px;
    }
    .Imagen img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
</style>