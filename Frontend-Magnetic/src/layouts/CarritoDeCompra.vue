<template>
    <div>
        <v-dialog 
            max-width="800" 
            v-model="dialog"
            scrollable
        >
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    v-bind="activatorProps"
                    class="ma-2"
                    variant="outlined"
                    icon
                >
                    <span class="material-symbols-outlined">shopping_cart</span>
                    <v-badge 
                        v-if="cartStore.totalItems > 0"
                        color="red"
                        :content="cartStore.totalItems.toString()"
                        location="top end"
                    >
                    </v-badge>
                </v-btn>
            </template>

            <template v-slot:default>
                <v-card>
                    <v-card-title class="d-flex align-center">
                        <span class="text-h6">Carrito de Compras</span>
                        <v-chip
                            v-if="cartStore.promotionalCampaign"
                            color="primary"
                            class="ml-2"
                            size="small"
                        >
                            {{ cartStore.promotionalCampaign }}
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-btn 
                            icon 
                            @click="dialog = false"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </v-btn>
                    </v-card-title>

                    <v-card-text v-if="cartStore.isEmpty">
                        <v-container fluid>
                            <v-row justify="center">
                                <v-col cols="12" class="text-center">
                                    <v-icon size="x-large" color="grey">mdi-cart-off</v-icon>
                                    <p class="text-h6 mt-3">Tu carrito está vacío</p>
                                    <p class="text-subtitle-1 text-grey">Agrega productos para comenzar tu compra</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-text v-else>
                        <v-list>
                            <v-list-item 
                                v-for="item in cartStore.items" 
                                :key="`${item.id}-${item.size}-${item.color}`"
                                class="mb-4"
                            >
                                <template v-slot:prepend>
                                    <v-img 
                                        :src="item.image" 
                                        :alt="item.name"
                                        width="100"
                                        height="100"
                                        cover
                                        class="rounded"
                                    ></v-img>
                                </template>

                                <v-list-item-title class="font-weight-bold mb-1">
                                    {{ item.name }}
                                    <span class="text-grey-darken-1 text-caption ml-2">(Ref: {{ item.reference }})</span>
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    <div class="d-flex flex-column">
                                        <div class="mb-2">
                                            <v-chip size="x-small" class="mr-1">{{ item.gender }}</v-chip>
                                            <v-chip size="x-small" class="mr-1">Talla: {{ item.size }}</v-chip>
                                            <v-chip size="x-small">Color: {{ item.color }}</v-chip>
                                        </div>
                                        <div class="d-flex align-center">
                                            <v-btn 
                                                icon 
                                                density="comfortable"
                                                variant="outlined"
                                                @click="decreaseQuantity(item)"
                                            >
                                                <v-icon>mdi-minus</v-icon>
                                            </v-btn>
                                            <span class="mx-3">{{ item.quantity }}</span>
                                            <v-btn 
                                                icon 
                                                density="comfortable"
                                                variant="outlined"
                                                @click="increaseQuantity(item)"
                                            >
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-list-item-subtitle>

                                <template v-slot:append>
                                    <div class="text-right">
                                        <div v-if="item.discount > 0" class="mb-1">
                                            <span class="text-decoration-line-through text-grey-darken-1">
                                                ${{ item.originalPrice.toLocaleString() }}
                                            </span>
                                            <v-chip 
                                                color="success" 
                                                size="x-small" 
                                                class="ml-1"
                                            >
                                                -{{ item.discount }}%
                                            </v-chip>
                                        </div>
                                        <div class="text-subtitle-1 font-weight-bold">
                                            ${{ (item.finalPrice * item.quantity).toLocaleString() }}
                                        </div>
                                        <div class="mt-2">
                                            <v-btn 
                                                icon 
                                                color="error" 
                                                size="small"
                                                variant="text"
                                                @click="removeItem(item)"
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </template>
                            </v-list-item>
                        </v-list>

                        <v-divider class="my-4"></v-divider>

                        <v-row>
                            <v-col cols="12">
                                <div class="d-flex flex-column align-end">
                                    <div class="mb-2 text-subtitle-1">
                                        Subtotal: ${{ cartStore.subtotal.toLocaleString() }}
                                    </div>
                                    <div v-if="cartStore.discount > 0" class="mb-2">
                                        <span class="text-success">
                                            Descuento general ({{ cartStore.discount }}%): 
                                            -${{ (cartStore.subtotal * (cartStore.discount / 100)).toLocaleString() }}
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        Envío: 
                                        <span v-if="cartStore.shippingCost === 0" class="text-success">
                                            ¡Gratis!
                                        </span>
                                        <span v-else>
                                            ${{ cartStore.shippingCost.toLocaleString() }}
                                        </span>
                                    </div>
                                    <div class="text-h6 font-weight-bold">
                                        Total: ${{ cartStore.total.toLocaleString() }}
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions v-if="!cartStore.isEmpty">
                        <v-btn
                            color="error"
                            variant="text"
                            @click="cartStore.clearCart()"
                        >
                            Vaciar carrito
                        </v-btn>
                        <v-spacer></v-spacer>
                        
                        <v-menu location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn 
                                    color="primary"
                                    v-bind="props"
                                >
                                    Realizar Pago
                                    <v-icon class="ml-2">mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item 
                                    v-for="method in paymentMethods"
                                    :key="method.id"
                                    @click="generatePayment(method.id)"
                                >
                                    <template v-slot:prepend>
                                        <v-icon>{{ method.icon }}</v-icon>
                                    </template>
                                    <v-list-item-title>{{ method.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const dialog = ref(false);

const paymentMethods = [
    { id: 'PSE', name: 'Pagar con PSE', icon: 'mdi-bank' },
    { id: 'Efecty', name: 'Pagar con Efecty', icon: 'mdi-cash' },
    { id: 'Card', name: 'Tarjeta de Crédito', icon: 'mdi-credit-card' }
];

const removeItem = (item) => {
    cartStore.removeItem(item.id, item.size, item.color);
};

const increaseQuantity = (item) => {
    cartStore.updateItemQuantity(item.id, item.size, item.color, item.quantity + 1);
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        cartStore.updateItemQuantity(item.id, item.size, item.color, item.quantity - 1);
    }
};

const generatePayment = (paymentMethod) => {
    // Here you would implement the logic to handle the payment
    // For example, redirect to a payment gateway or process the payment
    console.log(`Processing payment with ${paymentMethod}`);
    dialog.value = false; // Close the dialog after initiating payment
    cartStore.clearCart()
};
</script>