// stores/productStore.js
import { defineStore } from 'pinia';
import productsData from '../assets/Product.json';

export const useProductStore = defineStore('products', {
  state: () => ({
    allProducts: [],
    filteredProducts: [],
    searchQuery: '',
    currentPage: 1,
    pageSize: 10
  }),

  getters: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredProducts.slice(start, end);
    }
  },

  actions: {
    initializeProducts() {
      this.allProducts = productsData.products;
      this.filteredProducts = [...this.allProducts];
    },

    searchProducts(query) {
      this.searchQuery = query.toLowerCase().trim();
      this.currentPage = 1;
      
      // Búsqueda más flexible
      this.filteredProducts = this.allProducts.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery) ||
        product.shortDescription.toLowerCase().includes(this.searchQuery) ||
        (product.category && product.category.toLowerCase().includes(this.searchQuery))
      );
    },

    clearSearch() {
      this.searchQuery = '';
      this.filteredProducts = [...this.allProducts];
      this.currentPage = 1;
    },

    // Métodos adicionales de filtrado
    filterByGender(gender) {
      this.filteredProducts = this.allProducts.filter(
        product => product.gender === gender
      );
      this.currentPage = 1;
    },

    filterByPriceRange(min, max) {
      this.filteredProducts = this.allProducts.filter(
        product => product.salePrice >= min && product.salePrice <= max
      );
      this.currentPage = 1;
    },

    sortByPriceAsc() {
      this.filteredProducts.sort((a, b) => a.salePrice - b.salePrice);
    },

    sortByPriceDesc() {
      this.filteredProducts.sort((a, b) => b.salePrice - a.salePrice);
    }
  }
});