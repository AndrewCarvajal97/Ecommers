import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [], // Productos en el carrito
        discount: 0, // Descuento aplicado
        shippingCost: 0, // Costo de envío
        promotionalCampaign: null // Nueva propiedad para campaña promocional
    }),
    actions: {
        addItem(product) {
            const existing = this.items.find(item => 
                item.id === product.id && 
                item.size === product.size && 
                item.color === product.color
            );
            
            if (existing) {
                existing.quantity += 1;
            } else {
                this.items.push({ 
                    ...product, 
                    quantity: 1,
                    // Campos adicionales para mayor detalle
                    image: product.image || '', // Imagen del producto
                    size: product.size || '', // Talla
                    gender: product.gender || '', // Género
                    color: product.color || '', // Color
                    reference: product.reference || '', // Referencia
                    purchasePrice: product.purchasePrice || 0, // Valor de compra
                    salePrice: product.salePrice || 0, // Valor de venta
                    promotionalCampaign: product.promotionalCampaign || null, // Campaña de promoción
                    discount: product.discount || 0 // Descuento específico del producto
                });
            }
            this.calculateShipping();
        },
        removeItem(productId, size, color) {
            this.items = this.items.filter(item => 
                !(item.id === productId && item.size === size && item.color === color)
            );
            this.calculateShipping();
        },
        updateItemQuantity(productId, size, color, quantity) {
            const item = this.items.find(item => 
                item.id === productId && item.size === size && item.color === color
            );
            
            if (item) {
                if (quantity <= 0) {
                    this.removeItem(productId, size, color);
                } else {
                    item.quantity = quantity;
                }
            }
            this.calculateShipping();
        },
        clearCart() {
            this.items = [];
            this.discount = 0;
            this.shippingCost = 0;
            this.promotionalCampaign = null;
        },
        applyDiscount(discountPercentage, campaignName = null) {
            this.discount = Math.min(Math.max(discountPercentage, 0), 100);
            this.promotionalCampaign = campaignName;
        },
        calculateShipping() {
            const subtotal = this.subtotal;
            this.shippingCost = subtotal > 1000 ? 0 : 100;
        },
        checkout() {
            if (this.items.length === 0) {
                throw new Error('El carrito está vacío');
            }
            
            const order = {
                items: [...this.items],
                subtotal: this.subtotal,
                discount: this.discount,
                shippingCost: this.shippingCost,
                total: this.total,
                promotionalCampaign: this.promotionalCampaign
            };
            
            this.clearCart();
            return order;
        }
    },
    getters: {
        subtotal() {
            return this.items.reduce((total, item) => total + item.salePrice * item.quantity, 0);
        },
        totalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        },
        total() {
            const discountAmount = this.subtotal * (this.discount / 100);
            return this.subtotal - discountAmount + this.shippingCost;
        },
        isEmpty() {
            return this.items.length === 0;
        }
    }
});