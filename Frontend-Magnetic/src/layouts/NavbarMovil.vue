<template>
    <section class="siderBar">
        <div class="categorias" v-if="(secciones==='')">
            <div class="tipos" id="tiposContainer">
                <div 
                v-for="(categoria,position)  in categorias " 
                :key="position" 
                :class="{'tiposCategorias':true,'activa':categoria==categoriaSeleccionada }" 
                @click="seleccionarCategoria(categoria)"
                >
                    <p :id="categoria">{{ categoria }} </p>
                </div>
            </div>
            <RouterLink 
            v-for="(seccion,code) in listaSecciones" 
            :key="code" 
            class="rutas"
            @click="mostrarSider()"
            :to="verDatosCategoria('General',code,'Todo')"
            v-if="mostrarSecciones">
                <div class="logoSeccion">
                    <img :src="seccion['imagen']" alt="Logo de la categoria">
                </div>
                <p>{{ code }} </p>
            </RouterLink>
            <div 
            v-else  
            v-for="(Categoria,index) in categorias" 
            :class="{'categoriasBurbujas':true,'inactiva':Categoria!==categoriaSeleccionada}" >
                <div 
                class="contenedorBurbujas" 
                v-if="(Categoria===categoriaSeleccionada)" 
                v-for="(seccion,numberCode) in listaSecciones " 
                :key="numberCode">
                    <div 
                    class="burbujas" 
                    v-for="(categoria,Titulo) in objetoCategorias[Categoria]" >
                        <div 
                        class="contenedorTitulo" 
                        v-if="(numberCode===Titulo)">
                            <h2 >{{ Titulo  }}  </h2>
                        </div>
                        <div 
                        class="caja" >
                            <RouterLink 
                            v-for="(burbujaSeccion, seleccion) in categoria" 
                            :key="seleccion"
                            v-if="(numberCode===Titulo)"
                            @click="mostrarSider()"
                            class="burbuja" 
                            :to="verDatosCategoria(categoriaSeleccionada,Titulo,burbujaSeccion['nombre'])">
                                <img :src="burbujaSeccion['img']" alt="" class="imagen"  >
                                <span>{{ burbujaSeccion["nombre"] }} </span>

                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>



<script setup>
/*Imports */
import { ref,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
/*Estados y declaraciones generales */
const mostrar=ref(false)
const mostrarSecciones=ref(true)
const categoriaSeleccionada=ref("Todo")
const secciones=ref("")
const router=useRouter()
/*Props */
const props = defineProps({
    categorias:{
        type: Array,
        default: ["Todo","Mujer","Hombre","Parejas","Niños","Curvy"]
    },
    listaSecciones:{
        type: Object,
        default:{"Novedades":{url:"",imagen:"https://img.freepik.com/foto-gratis/retrato-modelo-elegante-joven-muchacha-ropa-casual-verano-sombrero-marron-maquillaje-natural-vidrios-aislados_158538-8568.jpg?t=st=1730777934~exp=1730781534~hmac=545da13f93287ef85fc564560d356b73cb510cb8e27a2e62ebb3c971a56674ae&w=740"}
        ,"Ofertas":{url:"/",imagen:"https://img.freepik.com/foto-gratis/vista-frontal-joven-bella-mujer-camisa-flores-pantalones-negros-paquetes-compras-posando_140725-15281.jpg?t=st=1730779291~exp=1730782891~hmac=0eadbb0a9957a4b87f3c70033ab5e927b0dc816f4e9b7da8b969bae89df7995d&w=740"}
        ,"Exclusivas":{url:"/",imagen:"https://img.freepik.com/foto-gratis/retrato-hombre-joven-guapo-modelo-vestido-ropa-jeans-gafas-sol-posando-aislado_158538-9108.jpg?t=st=1730779354~exp=1730782954~hmac=64d2752a8d42b99387530f5a68c6e8a86fc889ded6ef6a664b70f788cda1bf7d&w=740"}
        ,"Tendencias":{url:"/",imagen:"https://img.freepik.com/foto-gratis/retrato-joven-confiado-chaqueta-cuero_171337-9694.jpg?t=st=1730779434~exp=1730783034~hmac=732995fcd73ad4f8ffdd2e706c8394d66623968e15d5b6a2d519c9a32557b0e7&w=740"}
        ,"Volver":{url:"/",imagen:"https://img.freepik.com/foto-gratis/mujer-feliz-apuntando-al-espacio-copia-pizarra_329181-3908.jpg?t=st=1730779621~exp=1730783221~hmac=60ba22f511c6369c0fba4b87c0ee0448c8a30c7d1048eb081c01ea6dd876651b&w=740"}}
    },
    objetoCategorias:{
        type: Object,
        default:{}
    }   
    }
)
const emit=defineEmits(["ocultarSider"])
/*Funciones */
const mostrarSider=()=>{
    mostrar.value=!mostrar.value
    categoriaSeleccionada.value="Todo"
    mostrarSecciones.value=true
    emit("ocultarSider")
}



const seleccionarCategoria=(categoria)=>{
    
    const botonSeleccionado = document.getElementById(categoria);
        if (botonSeleccionado) {
          botonSeleccionado.scrollIntoView({
            behavior: 'smooth', // Animación suave
            block: 'center',   // Alinea el elemento en el contenedor padre
            inline: 'center'
        })}

    if(categoria==="Todo"){
        categoriaSeleccionada.value=""
        mostrarSecciones.value=true
        router.replace("/")
    }
    else{
        mostrarSecciones.value=false
        categoriaSeleccionada.value=categoria
    }
}
const verDatosCategoria=(categoria,seccion,burbuja)=>
{
    
    return(`/categoria/${categoria}/${seccion}/${burbuja}`)
    
}
</script>

<style scoped>
.siderBar{
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    padding: 1rem 0;
    position: absolute;
    left: 0;
    top: 0;
    background-color:white;
    transform: translateX(-120%);
    transition: all 1s ease;
    overflow: scroll;
    scrollbar-width: none;
    font-family: "Montserrat", sans-serif;
  	font-optical-sizing: auto;
  	font-weight: 600;
  	font-style: normal;
    z-index: 2;
}

.categorias{
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.categorias .rutas{
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 20vh;
    margin: 3rem 0;
   
}

.tipos{
    display: flex;
    align-items: center;
    gap: 2rem;
    overflow: scroll;
    justify-content: space-between;
    width: 80%;
    min-height: 50px;
    margin-left: ;
    box-sizing: border-box;
    scrollbar-width: none;
    border-bottom: solid 1px grey;  
}
.tiposCategorias{
    display: flex;
    align-items: center;
    text-align: center;
    height: 100%;
    border-radius: 50%;
}

.activa{
    background-color: rgba(100, 181, 246, 0.25);
}


.logoSeccion{
    display: flex;
    align-items: center;
    justify-content: end;
    box-sizing: border-box;
    border-radius: 100%;
    width: 5rem;
    height: 8rem;
    flex: 1;
}
.logoSeccion img{
    border-radius: 100%;
    width: 80%;
    height: 100%;
    object-fit: contain;
    
}
.rutas p{
    font-size: .8rem;
    text-align: center;
    flex: 1;
}


.contenedorTitulo{
    display: flex;
    flex: .2;
    justify-content: center;
    align-items: flex-end;
    align-content: flex-end;
    box-sizing: border-box;
}
.contenedorTitulo h2{
    font-size: 2rem;
    padding: 0;
    margin: 0;
}
.contenedorBurbujas{
    display: flex;
    flex-direction: column;
}
.burbujas{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.burbujas .contenedorTitulo{
    margin: 2rem 0;
}
.categoriasBurbujas{
    width: 100%;
    height: 100%;
}
.inactiva{
    display: none;
}
.caja{
    display: flex;
    width: 95%;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}
.burbuja{
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0;
    text-decoration: none;

}
.burbuja span{
    width: 150px;
    height: auto;
    text-align: center;
}
.burbuja .imagen{
    border: transparent 1px black;
    border-radius: 100%;
    width: 5rem;
    height: 8rem;
    margin: .2rem 0;
    object-fit: contain;
}
a {
  color: grey; /* o cualquier color que prefieras */
  text-decoration: none;
  transition: all 1s ease; /* si no quieres subrayado */
}

a:visited {
  color: grey; /* asegúrate de que el color sea el mismo que el estado inicial */
}



</style>
