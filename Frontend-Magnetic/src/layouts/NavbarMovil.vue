<template>
    <section :class="{'siderBar':true }">
        <div class="categorias">
            <div class="tipos">
                <div v-for="(categoria,index) in categorias" class="tiposCategorias">
                    <p>modasi</p>
                </div>
            </div>
            <div v-for="(categoria,index) in categorias" class="rutas">
                <IconoGoogle ruta="redes" icon="person"/>
            </div>
        </div>
        <div class="cerrar">
            <IconoGoogle @eventoClick="mostrarSider()" icon="first_page"/>
            
        </div>
    </section>
</template>

<script setup>
/*Imports */
import { ref,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import IconoGoogle from '../components/IconoGoogle.vue';
/*Estados y declaraciones generales */
const mostrar=ref(false)

/*Props */
const props = defineProps({
    categorias:{
        type: Array,
        default: [1,2,3,4,5,6,7,8,9,0]
    },
})
const emit=defineEmits(["ocultarSider"])
/*Funciones */
const mostrarSider=()=>{
    mostrar.value=!mostrar.value
    emit("ocultarSider")
}
</script>

<style  scoped>
.siderBar{
    display: flex;
    width: 80%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color: aqua;
    justify-content: space-between;
    transform: translateX(-120%);
    transition: transform 1s ease;
}

.categorias{
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
}

.categorias .rutas{
    display: flex;
    justify-items: center;
    align-items: center;
    width: 90%;
    height: 10vh;
    margin: .2rem 1rem;
    background-color: aliceblue;
}

.tipos{
    display: flex;
    align-items: center;
    overflow: scroll;
    width: 100%;
    margin: 0 1rem;
    height: 3rem;
    scrollbar-width: none;
    gap: 1rem;
}
.cerrar{
    position: absolute;
    top: 50%;
    left: 102%;
}


</style>