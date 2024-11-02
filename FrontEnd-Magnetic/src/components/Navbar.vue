<template>
    <nav class="menuSuperior">
        <section class="superior">
            <div class="logo">
                <img src="/img/marcaPersonal/NEGRO SIN FONDO.webp" alt="Logo de la empresa " @click="volverInicio()"> 
            </div>
            <div class="buscar">
                <input type="text" v-model="palabraBusqueda" placeholder="Buscar" @input="mostrarSugerencias(palabraBusqueda)"><button  class="lupa" @click="Busqueda(palabraBusqueda)"><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="iconosLaterales">
                <span class="material-symbols-outlined">person</span>
                <span class="material-symbols-outlined">shopping_cart</span>
                <span class="material-symbols-outlined">favorite</span>
                <span class="material-symbols-outlined">headphones</span>
                <span class="material-symbols-outlined">language</span>
            </div>
        </section>
        <section class="inferior" >
            <div class="categorias" v-for="(n , index) in numeros">
                <RouterLink :to="`/Category/${n}`">categoria {{n}}</RouterLink>
            </div>
        </section>
    </nav>
</template>

<script setup>
    

    /*Imports */
    import { ref,computed,} from 'vue';
    import { useRoute, useRouter } from 'vue-router'

    /*Estados*/
    const categoria=ref()
    const router=useRouter()
    const route=useRoute()
    const palabraBusqueda=ref('')
    /*Data */
    const numeros=8;
    const busquedasComunes = [
        "algo",
        "comounas",
        "estounas",
        "queunas",
        "seraunas",
        "unasca",
        "ejemplo"
    ]
    /*Funciones*/
    const volverInicio=()=>{
        router.replace('/')
    }
    const Busqueda = (palabra) => {
        if (palabra.trim() === '') {
            router.replace({ path: '/' });
        }
        else{
            router.replace({ query: { buscar: palabra } });
        }

    };

    const mostrarSugerencias=(palabra)=>{
        if (palabra.trim().length>3){
            const sugerencias = busquedasComunes.filter(sugerencia=>
            sugerencia.toLowerCase().includes(palabra.toLowerCase())
            )
            console.log(sugerencias)
            return sugerencias
        }
        return []
    } 
    
</script>

<style  scoped>
    .menuSuperior{
    margin: 1rem;
    display: flex;
    flex-direction: column;
    }
    .superior{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .logo{
        flex: 1;
    }
    .logo img{
        height: 30px;
    }
    .buscar{
        display: flex;
        align-items: center;
        flex: 1.2;
    }
    .buscar input{
        width: 60%;
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
    .iconosLaterales{
        flex: 1;
        display: flex;
        justify-content: center;
    }
    .inferior{
        width: 100%;
        background-color: aqua;
        display: flex;
        justify-content: space-around;
        margin: 1rem auto;
        gap: 1rem;
    }
</style>