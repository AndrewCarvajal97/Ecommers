<template>
    <section class="burbujasInferiores">
        <h2  class="titulo">Novedades</h2>
        <div class="contenedor novedades" @mouseenter="cambiarSeccion('novedades')"  >
            <RouterLink class="imagen"  v-for="(novedad,index) in novedades " :to="`/categoria/${categoriaActual}/Novedades/${novedad.nombre}`">
                <img :src="novedad.img" :alt="`Logo de la Categoria novedades${index}`">
                <h3>{{novedad.nombre}}</h3>
            </RouterLink>
        </div>
        <h2  class="titulo">Ofertas</h2>
        <div class="contenedor ofertas" @mouseenter="cambiarSeccion('ofertas')"> 
            <RouterLink class="imagen"  v-for="(categoria,index) in ofertas "  :to="`/categoria/${categoriaActual}/Ofertas/${categoria.nombre}`">
                <img :src="categoria.img" :alt="`Logo de la Categoria Ofertas ${index}`">
                <h2>{{categoria.nombre}}</h2>
            </RouterLink>
        </div>
        <h2  class="titulo">Exclusivos</h2>
        <div class="contenedor exclusivas" @mouseenter="cambiarSeccion('exclusivas')">
            <RouterLink class="imagen"  v-for="(categoria,index) in exclusivas "  :to="`/categoria/${categoriaActual}/Exclusivas/${categoria.nombre}`">
                <img :src="categoria.img" :alt="`Logo de la Categoria Exclusivas ${index}`">
                <h2>{{categoria.nombre}}</h2>
            </RouterLink>
        </div>
        <h2  class="titulo">Nuevos</h2>
        <div class="contenedor Nuevos" @mouseenter="cambiarSeccion('Nuevos')"> 
            <RouterLink class="imagen"  v-for="(categoria,index) in Nuevos "  :to="`/categoria/${categoriaActual}/Novedades/${categoria.nombre}`">
                <img :src="categoria.img" :alt="`Logo de la Categoria Nuevos ${index}`">
                <h2>{{categoria.nombre}}</h2>
            </RouterLink>
        </div>
    </section>
</template>

<script setup>
    /*Imports */
    import { ref } from 'vue';
    /*Estados */
    const seccionActual =ref('')
    /*Metodos */
    const cambiarSeccion = (seccion) => {
        seccionActual.value = seccion
    }
    /*Props */
    const props=defineProps({
        novedades:{
            type:Object,
            default:{}
        },
        ofertas:{
            type:Object,
            default:{}
        },
        exclusivas:{
            type:Object,
            default:{}
        },
        Nuevos:{
            type:Object,
            default:{}
        },
        index:{
            type:String,
            default:''
        },
        categoriaActual:{
            type:String,
            default:''
        }
    })
</script>

<style  scoped>
    .burbujasInferiores{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .titulo{
        text-align: center;
        font-size: 2rem;
    }
    .contenedor{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: .5rem 0;
    }
    .imagen{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }
    .imagen img{
        width: 80px;
        height: 50px;
        border-radius: 100%;
        object-fit: contain;
    }
    .imagen h3{
        text-align: center;
    }

</style>