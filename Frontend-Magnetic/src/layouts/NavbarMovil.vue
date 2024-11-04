<template>
    <section :class="{'siderBar':true }">
        <div class="categorias" v-if="(secciones==='')">
            <div class="tipos">
                <div v-for="(categoria,index)  in categorias " :key="index" class="tiposCategorias">
                    <p>{{ categoria }}</p>
                </div>
            </div>
            <div v-for="(seccion,index) in listaSecciones" :key="index" class="rutas" @click="cambiarSeccion(seccion)">
                <IconoGoogle  icon="person" class="icono"/>
                <p>{{ seccion }}</p>
            </div>
        </div>
        <div v-else>
            <div class="seccionSuperior"><IconoGoogle  icon="close" @click="cambiarSeccion('')" /><p>{{ secciones }}</p></div>
            <div v-for="(categoria,index) in categorias" class="rutas">
                <p v-if="index!==0">{{ categoria }} de pruebas</p>
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
const secciones=ref("")

/*Props */
const props = defineProps({
    categorias:{
        type: Array,
        default: ["Todo","Mujer","Curvy","Niños","Hombre","Hogar","Belleza"]
    },
    listaSecciones:{
        type: Array,
        default: ["Novedades","Ofertas","Colecciones Exclusivas","Nuevos diseños"]
    }
})
const emit=defineEmits(["ocultarSider"])
/*Funciones */
const mostrarSider=()=>{
    mostrar.value=!mostrar.value
    emit("ocultarSider")
}

const cambiarSeccion=(seccionSeleccionada)=>{
    secciones.value=seccionSeleccionada
}
</script>

<style  scoped>
.siderBar{
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color:whitesmoke;
    transform: translateX(-120%);
    transition: transform 1s ease;
}

.categorias{
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.categorias .rutas{
    display: flex;
    justify-items: center;
    align-items: center;
    width: 90%;
    height: 20vh;
    margin: .2rem 1rem;
}

.tipos{
    display: flex;
    align-items: center;
    overflow: scroll;
    width: 90%;
    margin: 0 1rem;
    padding: 0 1rem;
    box-sizing: border-box;
    height: 3rem;
    scrollbar-width: none;
    gap: 1rem;
    border-bottom: solid 1px grey;
}
.cerrar{
    position: absolute;
    top: 50%;
    left: 102%;
}
.rutas{
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}
.rutas p{
    font-size: .8rem;
    text-align: initial;
    text-align: ;
    flex: .7;
}
.rutas .icono{
    display: flex;
    justify-content: center;
    flex: .2;
    font-size: 3rem;
}
.seccionSuperior{
    display:flex;
    justify-content: flex-start;
    gap: 3rem;
    margin: 0 2rem;
    align-items: center;
}


</style>