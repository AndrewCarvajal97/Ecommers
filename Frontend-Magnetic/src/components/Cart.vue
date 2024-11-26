<template>
    <v-container >
        <h2>Carrito de Compras</h2>
        <v-list>
            <v-list-item
                v-for="item in cartItems"
                :key="item.id"
            >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>${{ item.price }}</v-list-item-subtitle>
                
                <template v-slot:append>
                    <v-btn-group>
                        <v-btn 
                            icon 
                            @click="decreaseQuantity(item.id, item.quantity)"
                        >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        
                        <v-text-field
                            v-model.number="item.quantity"
                            type="number"
                            min="1"
                            @change="updateQuantity(item.id, item.quantity)"
                            dense
                            hide-details
                            style="width: 70px"
                        ></v-text-field>
                        
                        <v-btn 
                            icon 
                            @click="increaseQuantity(item.id)"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        
                        <v-btn 
                            icon 
                            color="error" 
                            @click="removeFromCart(item.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-btn-group>
                </template>
            </v-list-item>
        </v-list>

        <v-divider class="my-4"></v-divider>

        <v-row>
            <v-col cols="12">
                <div class="d-flex justify-space-between">
                    <span>Subtotal:</span>
                    <span>${{ subtotal }}</span>
                </div>
                <div class="d-flex justify-space-between">
                    <span>Envío:</span>
                    <span>${{ shippingCost }}</span>
                </div>
                <div class="d-flex justify-space-between font-weight-bold">
                    <span>Total:</span>
                    <span>${{ total }}</span>
                </div>
            </v-col>
        </v-row>

        <v-btn 
            color="primary" 
            block 
            class="mt-4"
            @click="proceedToCheckout"
        >
            Proceder al Checkout
        </v-btn>
    </v-container>
    <v-container>
        <v-alert type="info">
            Tu carrito está vacío
        </v-alert>
    </v-container>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { computed } from 'vue';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);
const total = computed(() => cartStore.total);
const shippingCost = computed(() => cartStore.shippingCost);

const removeFromCart = (productId) => {
    cartStore.removeItem(productId);
};

const updateQuantity = (productId, quantity) => {
    cartStore.updateItemQuantity(productId, quantity);
};

const increaseQuantity = (productId) => {
    const item = cartStore.items.find(item => item.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity + 1);
    }
};

const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
        updateQuantity(productId, currentQuantity - 1);
    } else {
        removeFromCart(productId);
    }
};

const proceedToCheckout = () => {
    try {
        const order = cartStore.checkout();
        // Aquí podrías redirigir a una página de confirmación o mostrar un mensaje
        console.log('Orden creada:', order);
    } catch (error) {
        // Manejar error (carrito vacío)
        console.error(error.message);
    }
};
</script>