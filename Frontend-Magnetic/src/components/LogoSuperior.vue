<template>
    <div>
        <img src="/img/marcaPersonal/NEGRO_SIN_FONDO.webp" alt="Logo de la empresa" @click="volverInicio(isMovil)" :style="{width: size}">
    </div>
</template>

<script setup>
/*imports */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
/*props y emits*/
const props = defineProps({
    isMovil:{
        type:Boolean,
        default:false
    },
    size:{
        type:String,
        default:'100%'
    }
})
const emit=defineEmits(["emitirBuscar"])
const router=useRouter()
const volverInicio=(isMovil)=>{
    if(isMovil){
        emit("emitirBuscar")
    }else{
        router.replace('/')
    }
    
}
</script>

<style  scoped>
    div{
        cursor: pointer;
    }
</style>