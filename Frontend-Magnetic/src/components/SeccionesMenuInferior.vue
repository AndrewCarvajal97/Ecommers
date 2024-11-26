<template>
    <section class="category-bubbles">
        <div class="category-section">
            <h2 class="section-title">Novedades</h2>
            <div 
                class="category-container novedades" 
                @mouseenter="cambiarSeccion('novedades')"
            >
                <RouterLink 
                    v-for="(novedad, index) in novedades" 
                    :key="index"
                    class="category-bubble"  
                    :to="`/categoria/${categoriaActual}/Novedades/${novedad.nombre}`"
                >
                    <div class="bubble-content">
                        <div class="bubble-image-wrapper">
                            <img 
                                :src="novedad.img" 
                                :alt="`Logo de Novedad ${index}`" 
                                class="bubble-image"
                            >
                        </div>
                        <h3 class="bubble-title">{{ novedad.nombre }}</h3>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="category-section">
            <h2 class="section-title">Ofertas</h2>
            <div 
                class="category-container ofertas" 
                @mouseenter="cambiarSeccion('ofertas')"
            >
                <RouterLink 
                    v-for="(categoria, index) in ofertas" 
                    :key="index"
                    class="category-bubble"  
                    :to="`/categoria/${categoriaActual}/Ofertas/${categoria.nombre}`"
                >
                    <div class="bubble-content">
                        <div class="bubble-image-wrapper">
                            <img 
                                :src="categoria.img" 
                                :alt="`Logo de Oferta ${index}`" 
                                class="bubble-image"
                            >
                        </div>
                        <h3 class="bubble-title">{{ categoria.nombre }}</h3>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="category-section">
            <h2 class="section-title">Exclusivos</h2>
            <div 
                class="category-container exclusivas" 
                @mouseenter="cambiarSeccion('exclusivas')"
            >
                <RouterLink 
                    v-for="(categoria, index) in exclusivas" 
                    :key="index"
                    class="category-bubble"  
                    :to="`/categoria/${categoriaActual}/Exclusivas/${categoria.nombre}`"
                >
                    <div class="bubble-content">
                        <div class="bubble-image-wrapper">
                            <img 
                                :src="categoria.img" 
                                :alt="`Logo de Exclusiva ${index}`" 
                                class="bubble-image"
                            >
                        </div>
                        <h3 class="bubble-title">{{ categoria.nombre }}</h3>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div class="category-section">
            <h2 class="section-title">Nuevos</h2>
            <div 
                class="category-container nuevos" 
                @mouseenter="cambiarSeccion('nuevos')"
            >
                <RouterLink 
                    v-for="(categoria, index) in Nuevos" 
                    :key="index"
                    class="category-bubble"  
                    :to="`/categoria/${categoriaActual}/Novedades/${categoria.nombre}`"
                >
                    <div class="bubble-content">
                        <div class="bubble-image-wrapper">
                            <img 
                                :src="categoria.img" 
                                :alt="`Logo de Nuevo ${index}`" 
                                class="bubble-image"
                            >
                        </div>
                        <h3 class="bubble-title">{{ categoria.nombre }}</h3>
                    </div>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

// Estados
const seccionActual = ref('');

// Métodos
const cambiarSeccion = (seccion) => {
    seccionActual.value = seccion;
};

// Props
const props = defineProps({
    novedades: {
        type: Object,
        default: () => ({})
    },
    ofertas: {
        type: Object,
        default: () => ({})
    },
    exclusivas: {
        type: Object,
        default: () => ({})
    },
    Nuevos: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: String,
        default: ''
    },
    categoriaActual: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
.category-bubbles {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem;
    background-color: #f9f9f9;
}

.category-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section-title {
    text-align: center;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.category-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .8rem;
    width: 100%;
    overflow-x: auto;
    padding: 0;
}

.category-bubble {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
}

.category-bubble:hover {
    transform: scale(1.05);
}

.bubble-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.bubble-image-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
    transition: box-shadow 0.3s ease;
}

.category-bubble:hover .bubble-image-wrapper {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.bubble-image {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
}

.bubble-title {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Scrollbar styles for overflow */
.category-container::-webkit-scrollbar {
    height: 6px;
}

.category-container::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.category-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.category-container::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>