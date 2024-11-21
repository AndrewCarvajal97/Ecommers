<template>
    <v-container v-if="product">
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="product.image"
            height="400"
            cover
          ></v-img>
        </v-col>
        
        <v-col cols="12" md="6">
          <div class="d-flex align-center mb-4">
            <h1 class="text-h4">{{ product.name }}</h1>
            <v-chip
              v-if="product.promotionalCampaign"
              color="primary"
              class="ml-4"
            >
              {{ product.promotionalCampaign }}
            </v-chip>
          </div>
  
          <p class="text-subtitle-1 mb-4">Ref: {{ product.reference }}</p>
    
          <!-- Precio y descuento -->
          <div class="d-flex align-center mb-4">
            <template v-if="product.discount > 0">
              <span class="text-h4 text-decorated-line-through text-grey">
                ${{ product.salePrice.toLocaleString() }}
              </span>
              <span class="text-h4 ml-4 text-success">
                ${{ calculateDiscountPrice(product.salePrice, product.discount).toLocaleString() }}
              </span>
              <v-chip
                color="success"
                class="ml-4"
              >
                {{ product.discount }}% OFF
              </v-chip>
            </template>
            <span v-else class="text-h4">
              ${{ product.salePrice.toLocaleString() }}
            </span>
          </div>
  
          <!-- Stock -->
          <div class="mb-4">
            <v-chip
              :color="product.stock > 0 ? 'success' : 'error'"
              class="mb-2"
            >
              {{ product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado' }}
            </v-chip>
          </div>
    
          <!-- Descripción larga -->
          <div class="mb-6">
            <h2 class="text-h6 mb-2">Descripción</h2>
            <p class="text-body-1">{{ product.longDescription }}</p>
          </div>
    
          <!-- Detalles del producto -->
          <v-card class="mb-6">
            <v-card-text>
              <h3 class="text-h6 mb-2">Detalles del producto</h3>
              <v-list>
                <v-list-item v-for="(value, key) in product.details" :key="key">
                  <template v-slot:prepend>
                    <v-icon>mdi-information</v-icon>
                  </template>
                  <v-list-item-title class="text-capitalize">{{ key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
    
          <!-- Selección de talla y color -->
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedSize"
                :items="product.availableSizes"
                label="Talla"
                outlined
                dense
                :disabled="product.stock === 0"
              ></v-select>
            </v-col>
            
            <v-col cols="6">
              <v-select
                v-model="selectedColor"
                :items="product.availableColors"
                label="Color"
                outlined
                dense
                :disabled="product.stock === 0"
              ></v-select>
            </v-col>
          </v-row>
  
          <!-- Cantidad -->
          <v-row class="mb-4">
            <v-col cols="6">
              <v-text-field
                v-model="quantity"
                type="number"
                label="Cantidad"
                min="1"
                :max="product.stock"
                :disabled="product.stock === 0"
                @input="validateQuantity"
              ></v-text-field>
            </v-col>
          </v-row>
    
          <!-- Botón de agregar al carrito -->
          <v-btn
            block
            color="primary"
            size="large"
            @click="addToCart"
            :disabled="!canAddToCart"
          >
            <v-icon left>mdi-cart-plus</v-icon>
            {{ product.stock === 0 ? 'Agotado' : 'Agregar al Carrito' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCartStore } from '../stores/cart.js';
  import { products } from '../assets/Products.js';
  
  const route = useRoute();
  const cartStore = useCartStore();
  
  // Obtener producto por ID
  const product = computed(() => 
    products.find(p => p.id === parseInt(route.params.id))
  );
  
  const selectedSize = ref(null);
  const selectedColor = ref(null);
  const quantity = ref(1);
  
  // Calcular precio con descuento
  const calculateDiscountPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };
  
  // Validar cantidad
  const validateQuantity = () => {
    let val = parseInt(quantity.value);
    if (isNaN(val) || val < 1) {
      quantity.value = 1;
    } else if (val > product.value.stock) {
      quantity.value = product.value.stock;
    }
  };
  
  const canAddToCart = computed(() => {
    return (
      selectedSize.value && 
      selectedColor.value && 
      product.value.stock > 0 &&
      quantity.value > 0 &&
      quantity.value <= product.value.stock
    );
  });
  
  const addToCart = () => {
    if (canAddToCart.value) {
      cartStore.addItem({
        ...product.value,
        size: selectedSize.value,
        color: selectedColor.value,
        quantity: parseInt(quantity.value)
      });
  
      // Reset form
      quantity.value = 1;
      selectedSize.value = null;
      selectedColor.value = null;
    }
  };
  </script>