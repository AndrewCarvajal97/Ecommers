<template>
    <div>
        <v-dialog 
            max-width="800" 
            v-model="dialog"
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
                        :content="cartStore.totalItems"
                    >
                    </v-badge>
                </v-btn>
            </template>

            <template v-slot:default>
                <v-card>
                    <v-card-title class="d-flex align-center">
                        Carrito de Compras
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
                                    <v-icon size="large" color="grey">mdi-cart-off</v-icon>
                                    <p class="text-h6 mt-3">Tu carrito está vacío</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-text v-else>
                        <v-list>
                            <v-list-item 
                                v-for="item in cartStore.items" 
                                :key="`${item.id}-${item.size}-${item.color}`"
                                class="mb-2"
                            >
                                <template v-slot:prepend>
                                    <v-avatar size="80">
                                        <v-img 
                                            :src="item.image" 
                                            :alt="item.reference"
                                            cover
                                        ></v-img>
                                    </v-avatar>
                                </template>

                                <v-list-item-title>
                                    {{ item.reference }}
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    <div>
                                        Talla: {{ item.size }} | 
                                        Color: {{ item.color }} | 
                                        Género: {{ item.gender }}
                                    </div>
                                    <div class="d-flex align-center mt-2">
                                        <v-btn 
                                            icon 
                                            size="small" 
                                            @click="decreaseQuantity(item)"
                                        >
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <span class="mx-2">{{ item.quantity }}</span>
                                        <v-btn 
                                            icon 
                                            size="small" 
                                            @click="increaseQuantity(item)"
                                        >
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                </v-list-item-subtitle>

                                <template v-slot:append>
                                    <div class="text-right">
                                        <v-chip 
                                            v-if="item.promotionalCampaign" 
                                            color="primary" 
                                            size="small"
                                        >
                                            {{ item.promotionalCampaign }}
                                        </v-chip>
                                        <div>
                                            Precio: ${{ item.salePrice.toLocaleString() }}
                                            <v-btn 
                                                icon 
                                                color="error" 
                                                size="small"
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
                            <v-col cols="12" class="text-right">
                                <p>Subtotal: ${{ cartStore.subtotal.toLocaleString() }}</p>
                                <p v-if="cartStore.discount > 0">
                                    Descuento ({{ cartStore.discount }}%): 
                                    ${{ (cartStore.subtotal * (cartStore.discount / 100)).toLocaleString() }}
                                </p>
                                <p>Envío: ${{ cartStore.shippingCost.toLocaleString() }}</p>
                                <p class="text-h6">
                                    Total: ${{ cartStore.total.toLocaleString() }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions v-if="!cartStore.isEmpty">
                        <v-spacer></v-spacer>
                        
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn 
                                    color="primary"
                                    v-bind="props"
                                >
                                    Generar Pago
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item 
                                    @click="generatePayment('PSE')"
                                    title="Pagar con PSE"
                                >
                                    <template v-slot:prepend>
                                        <span class="material-symbols-outlined">account_balance</span>
                                    </template>
                                    Pagar con PSE
                                </v-list-item>
                                <v-list-item 
                                    @click="generatePayment('Efecty')"
                                    title="Pagar con Efecty"
                                >
                                    <template v-slot:prepend>
                                        <span class="material-symbols-outlined">paid</span>
                                    </template>
                                    Pagar con Efecty
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

const removeItem = (item) => {
    cartStore.removeItem(item.id, item.size, item.color);
};

const increaseQuantity = (item) => {
    cartStore.updateItemQuantity(item.id, item.size, item.color, item.quantity + 1);
};

const decreaseQuantity = (item) => {
    cartStore.updateItemQuantity(item.id, item.size, item.color, item.quantity - 1);
};

const generatePayment = (method) => {
    // Implementación de la lógica de pago
    console.log(`Generando pago con ${method}`);
    // Aquí puedes agregar la lógica para procesar el pago
    dialog.value = false;
};
</script>