// stores/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        discount: 0,
        shippingCost: 0,
        promotionalCampaign: null
    }),
    actions: {
        // Método simplificado para agregar al carrito desde ProductList
        addToCart(product) {
            // Si no se especifica una cantidad, usar 1 por defecto
            const productToAdd = {
                ...product,
                quantity: 1,
                size: product.size || '', 
                color: product.color || ''
            };
            
            this.addItem(productToAdd);
        },

        addItem(product) {
            // Calcular el precio con descuento si existe
            const discountedPrice = product.discount > 0 
                ? Math.round(product.salePrice * (1 - product.discount / 100))
                : product.salePrice;

            const existing = this.items.find(item => 
                item.id === product.id && 
                item.size === product.size && 
                item.color === product.color
            );
            
            if (existing) {
                // Solo actualizamos la cantidad y mantenemos el resto igual
                existing.quantity += product.quantity || 1;
            } else {
                // Creamos un nuevo item con el precio calculado
                this.items.push({ 
                    ...product,
                    quantity: product.quantity || 1,
                    finalPrice: discountedPrice,
                    // Aseguramos que todos los campos necesarios estén presentes
                    image: product.image || '',
                    size: product.size || '',
                    gender: product.gender || '',
                    color: product.color || '',
                    reference: product.reference || '',
                    purchasePrice: product.purchasePrice || 0,
                    salePrice: product.salePrice,
                    originalPrice: product.salePrice, // Guardamos el precio original
                    promotionalCampaign: product.promotionalCampaign || null,
                    discount: product.discount || 0
                });
            }
            this.calculateShipping();
        },

        // Los demás métodos permanecen igual...
        removeItem(productId, size, color) {
            this.items = this.items.filter(item => 
                !(item.id === productId && 
                  item.size === size && 
                  item.color === color)
            );
            this.calculateShipping();
        },

        updateItemQuantity(productId, size, color, quantity) {
            const item = this.items.find(item => 
                item.id === productId && 
                item.size === size && 
                item.color === color
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
            // Recalcular los precios finales cuando se aplica un descuento general
            this.items.forEach(item => {
                const productDiscount = Math.max(item.discount || 0, this.discount);
                item.finalPrice = Math.round(item.originalPrice * (1 - productDiscount / 100));
            });
        },

        calculateShipping() {
            // Ejemplo: Envío gratis para compras mayores a 100000
            this.shippingCost = this.subtotal > 100000 ? 0 : 12000;
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
            return this.items.reduce((total, item) => {
                // Usar el precio con descuento del producto si existe
                const priceWithProductDiscount = item.finalPrice || item.salePrice;
                return total + (priceWithProductDiscount * item.quantity);
            }, 0);
        },

        totalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        },

        total() {
            // Aplicar el descuento general después de los descuentos por producto
            const subtotalAfterProductDiscounts = this.subtotal;
            const generalDiscountAmount = this.discount > 0 
                ? Math.round(subtotalAfterProductDiscounts * (this.discount / 100))
                : 0;
            
            return subtotalAfterProductDiscounts - generalDiscountAmount + this.shippingCost;
        },

        isEmpty() {
            return this.items.length === 0;
        }
    }
});