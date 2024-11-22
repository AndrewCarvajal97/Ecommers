<template>
  <div class="product-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="2">
          <v-select
            v-model="pageSize"
            :items="[5, 10, 15, 20]"
            label="Productos por página"
            @update:model-value="updatePagination"
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="3">
          <v-select
            :items="priceRanges"
            label="Rango de Precio"
            @update:model-value="filterByPriceRange"
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="2">
          <v-select
            :items="['', 'Hombre', 'Mujer','Unisex']"
            label="Género"
            @update:model-value="filterByGender"
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="2">
          <v-select
            :items="sortOptions"
            label="Ordenar por Precio"
            @update:model-value="sortByPrice"
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="3">
          <v-btn 
            color="secondary" 
            block 
            @click="clearAllFilters"
          >
            Limpiar Filtros
          </v-btn>
        </v-col>
        
        
      </v-row>

      <v-row v-if="paginatedProducts.length === 0">
        <v-col>
          <v-alert type="info" class="text-center">
            No se encontraron productos
          </v-alert>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          cols="12" 
          sm="6" 
          md="4"
        >
          <v-card class="product-card">
            <div class="image-carousel-container">
              <v-img 
                :src="product.image[product.currentImageIndex]" 
                :alt="product.name"
                height="250"
                cover
                class="cursor-pointer"
                @click="goToProductDetail(product.id)"
              ></v-img>
              
              <div class="image-dots">
                <v-btn 
                  v-for="(img, index) in product.image" 
                  :key="index"
                  icon 
                  size="x-small"
                  class="mx-1"
                  :class="{ 'active-dot': product.currentImageIndex === index }"
                  @click="changeProductImage(product, index)"
                >
                  <v-icon>mdi-circle</v-icon>
                </v-btn>
              </div>
            </div>
            
            <v-card-title 
              @click="goToProductDetail(product.id)" 
              class="cursor-pointer"
            >
              {{ product.name }}
            </v-card-title>
            
            <v-card-subtitle>
              {{ product.shortDescription }}
            </v-card-subtitle>
            
            <v-card-text>
              <div class="d-flex justify-space-between align-center">
                <div>
                  <span 
                    v-if="product.discount > 0" 
                    class="text-decoration-line-through mr-2 text-grey"
                  >
                    ${{ product.salePrice.toLocaleString() }}
                  </span>
                  <span class="text-h6">
                    ${{ calculateDiscountedPrice(product).toLocaleString() }}
                  </span>
                </div>
                <v-chip 
                  v-if="product.discount > 0" 
                  color="green" 
                  small
                >
                  -{{ product.discount }}%
                </v-chip>
              </div>
            </v-card-text>
            
            <v-card-actions>
              <v-btn 
                color="primary" 
                block
                @click="addToCart(product)"
              >
                Agregar al carrito
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4" v-if="paginatedProducts.length > 0">
        <v-col>
          <div class="text-center">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              @update:model-value="updatePagination"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore.js';
import { useCartStore } from '../stores/cart.js';

// Inicializar router y stores
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

// Destructuramos referencias reactivas del store de productos
const { 
  paginatedProducts, 
  totalPages
} = storeToRefs(productStore);

// Sincronizar estados locales con el store
const currentPage = ref(productStore.currentPage);
const pageSize = ref(productStore.pageSize);

// Configuración de filtros y ordenamiento
const priceRanges = [
  { title: 'Todos los Precios', value: null },
  { title: '$0 - $50', value: { min: 0, max: 50 } },
  { title: '$50 - $100', value: { min: 50, max: 100 } },
  { title: '$100 - $200', value: { min: 100, max: 200 } },
  { title: 'Más de $200', value: { min: 200, max: Infinity } }
];

const sortOptions = [
  { title: 'Precio: Menor a Mayor', value: 'asc' },
  { title: 'Precio: Mayor a Menor', value: 'desc' }
];

onMounted(() => {
  // Inicializar el store con los datos iniciales
  productStore.initializeProducts();
  
  // Añadir índice de imagen actual a cada producto
  paginatedProducts.value.forEach(product => {
    product.currentImageIndex = 0;
  });
});

// Método para actualizar paginación
const updatePagination = () => {
  productStore.currentPage = currentPage.value;
  productStore.pageSize = pageSize.value;
};

// Calcular precio con descuento
const calculateDiscountedPrice = (product) => {
  return product.discount > 0
    ? Math.round(product.salePrice * (1 - product.discount / 100))
    : product.salePrice;
};

// Cambiar imagen del producto
const changeProductImage = (product, index) => {
  product.currentImageIndex = index;
};

// Filtros y ordenamiento
const filterByPriceRange = (range) => {
  if (range) {
    productStore.filterByPriceRange(range.min, range.max);
  } else {
    productStore.clearAllFilters();
  }
};

const filterByGender = (gender) => {
  if (gender) {
    productStore.filterByGender(gender);
  } else {
    productStore.clearAllFilters();
  }
};

const sortByPrice = (order) => {
  productStore.sortByPrice(order);
};

const clearAllFilters = () => {
  productStore.clearAllFilters();
};

// Agregar al carrito
const addToCart = (product) => {
  // Preparar el producto para agregar al carrito
  const productToAdd = {
    ...product,
    quantity: 1
  };
  
  cartStore.addToCart(productToAdd);
};

// Navegar al detalle del producto
const goToProductDetail = (productId) => {
  router.push({ 
    name: 'ProductDetail', 
    params: { id: productId } 
  });
};

// Método para mostrar el carrito (opcional)
const showCart = () => {
  router.push({ name: 'Cart' });
};
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

.image-carousel-container {
  position: relative;
}

.image-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}
.mx-1{
  background-color: rgb(238, 247, 247);
  max-height: 11px;
  max-width: 11px;
}
.image-dots .v-btn {
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.image-dots .v-btn.active-dot {
  background-color: black;
}
</style>