<template>
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card>
            <v-img 
              v-if="product.image" 
              :src="product.image" 
              height="200" 
              cover
            ></v-img>
            
            <v-card-title>{{ product.name }}</v-card-title>
            
            <v-card-subtitle>
              <div>Referencia: {{ product.reference }}</div>
              <div>Precio: ${{ product.salePrice.toLocaleString() }}</div>
            </v-card-subtitle>
            
            <v-card-text>
              <v-row>
                <!-- Selección de Talla -->
                <v-col cols="12">
                  <v-select
                    v-model="productSelections[product.id].size"
                    :items="product.availableSizes"
                    label="Talla"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                
                <!-- Selección de Color -->
                <v-col cols="12">
                  <v-select
                    v-model="productSelections[product.id].color"
                    :items="product.availableColors"
                    label="Color"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                
                <!-- Información Adicional -->
                <v-col cols="12">
                  <v-chip-group>
                    <v-chip 
                      v-if="product.promotionalCampaign" 
                      color="primary" 
                      label
                    >
                      {{ product.promotionalCampaign }}
                    </v-chip>
                    <v-chip 
                      v-if="product.discount > 0" 
                      color="success" 
                      label
                    >
                      {{ product.discount }}% OFF
                    </v-chip>
                  </v-chip-group>
                </v-col>
                
                <!-- Cantidad y Acciones -->
                <v-col cols="12">
                  <v-row>
                    <v-col>
                      <v-btn-group>
                        <v-btn 
                          icon 
                          @click.stop="decreaseQuantity(product)"
                        >
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        
                        <v-text-field
                          v-model.number="productQuantities[product.id]"
                          type="number"
                          min="0"
                          :max="product.stock"
                          style="width: 70px"
                          hide-details
                          dense
                          @change="updateQuantity(product, $event)"
                        ></v-text-field>
                        
                        <v-btn 
                          icon 
                          @click.stop="increaseQuantity(product)"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-btn-group>
                    </v-col>
                    
                    <v-col cols="auto">
                      <v-btn 
                        color="primary" 
                        @click.stop="addToCart(product)"
                        :disabled="!canAddToCart(product)"
                      >
                        Agregar al Carrito
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
import { useCartStore } from '../stores/cart';
  
const cartStore = useCartStore();
  
const products = [
  { 
    id: 1, 
    name: 'Camiseta Básica', 
    reference: 'CAMISETA-001',
    salePrice: 45000,
    purchasePrice: 20000,
    stock: 10,
    gender: 'Unisex',
    image: '/path/to/camiseta-image.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Blanco', 'Negro', 'Azul', 'Rojo'],
    promotionalCampaign: 'Verano 2024',
    discount: 10
  },
  { 
    id: 2, 
    name: 'Pantalón Deportivo', 
    reference: 'PANTALON-002',
    salePrice: 65000,
    purchasePrice: 30000,
    stock: 5,
    gender: 'Hombre',
    image: '/path/to/pantalon-image.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Negro', 'Gris', 'Azul'],
    promotionalCampaign: null,
    discount: 0
  },
  { 
    id: 3, 
    name: 'Chaqueta Casual', 
    reference: 'CHAQUETA-003',
    salePrice: 120000,
    purchasePrice: 60000,
    stock: 8,
    gender: 'Mujer',
    image: '/path/to/chaqueta-image.jpg',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Beige', 'Verde', 'Café'],
    promotionalCampaign: 'Fin de Temporada',
    discount: 15
  },
];

// Objeto para trackear cantidades de cada producto
const productQuantities = ref(
  products.reduce((acc, product) => {
    acc[product.id] = 1;
    return acc;
  }, {})
);

// Objeto para trackear selecciones de talla y color
const productSelections = reactive(
  products.reduce((acc, product) => {
    acc[product.id] = {
      size: product.availableSizes[0],
      color: product.availableColors[0]
    };
    return acc;
  }, {})
);
  
const addToCart = (product) => {
  const quantity = productQuantities.value[product.id] || 1;
  const selection = productSelections[product.id];
  
  // Añadir múltiples unidades de una vez
  for (let i = 0; i < quantity; i++) {
    cartStore.addItem({
      ...product,
      size: selection.size,
      color: selection.color
    });
  }
  
  // Resetear cantidad a 1 después de añadir
  productQuantities.value[product.id] = 1;
};

const canAddToCart = (product) => {
  const selection = productSelections[product.id];
  return selection.size && selection.color;
};

const increaseQuantity = (product) => {
  const currentQuantity = productQuantities.value[product.id] || 1;
  if (currentQuantity < product.stock) {
    productQuantities.value[product.id] = currentQuantity + 1;
  }
};

const decreaseQuantity = (product) => {
  const currentQuantity = productQuantities.value[product.id] || 1;
  if (currentQuantity > 1) {
    productQuantities.value[product.id] = currentQuantity - 1;
  }
};

const updateQuantity = (product, event) => {
  const newQuantity = Number(event.target.value);
  if (newQuantity > 0 && newQuantity <= product.stock) {
    productQuantities.value[product.id] = newQuantity;
  } else {
    // Restablecer a 1 si el valor no es válido
    productQuantities.value[product.id] = 1;
  }
};
</script>