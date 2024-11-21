<!-- views/ProductList.vue -->
<template>
  <div class="product-list">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3">
          <v-select
            v-model="pageSize"
            :items="[5, 10, 15, 20]"
            label="Productos por página"
            @update:model-value="updatePagination"
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="3" class="d-flex align-center">
          <v-badge 
            :content="cartStore.totalItems" 
            color="primary"
            overlap
          >
            <v-btn icon @click="showCart">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
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
            <!-- Envolver la imagen en un div con evento click para navegar al detalle -->
            <div @click="goToProductDetail(product.id)">
              <v-img 
                :src="product.image" 
                :alt="product.name"
                height="250"
                cover
                class="cursor-pointer"
              ></v-img>
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

onMounted(() => {
  // Inicializar el store con los datos iniciales
  productStore.initializeProducts();
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
</style>