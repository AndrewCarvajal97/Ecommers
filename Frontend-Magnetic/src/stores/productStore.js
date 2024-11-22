import { defineStore } from 'pinia';
import productsData from '../assets/Product.json';

export const useProductStore = defineStore('products', {
  state: () => ({
    allProducts: [],
    filteredProducts: [],
    searchQuery: '',
    currentPage: 1,
    pageSize: 10,
    priceFilter: { min: 0, max: Infinity },
    genderFilter: null,
    section: null,
    category: null,
    sortOrder: null
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
      this.applyFilters();
    },

    applyFilters() {
      let filtered = this.allProducts;

      // Apply price range filter
      filtered = filtered.filter(product => 
        product.salePrice >= this.priceFilter.min && 
        product.salePrice <= this.priceFilter.max
      );

      // Apply gender filter
      if (this.genderFilter) {
        filtered = filtered.filter(product => product.gender === this.genderFilter);
      }

      // Apply section filter
      if (this.section) {
        filtered = filtered.filter(product => product.section === this.section);
      }

      // Apply category filter
      if (this.category) {
        filtered = filtered.filter(product => product.category === this.category);
      }

      // Apply search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query) ||
          (product.category && product.category.toLowerCase().includes(query))
        );
      }

      // Apply sorting
      if (this.sortOrder === 'asc') {
        filtered.sort((a, b) => a.salePrice - b.salePrice);
      } else if (this.sortOrder === 'desc') {
        filtered.sort((a, b) => b.salePrice - a.salePrice);
      }

      this.filteredProducts = filtered;
      this.currentPage = 1;
    },

    setRouteFilters(section, category) {
      this.section = section;
      this.category = category;
      this.applyFilters();
    },

    filterByPriceRange(min = 0, max = Infinity) {
      this.priceFilter = { min, max };
      this.applyFilters();
    },

    filterByGender(gender) {
      this.genderFilter = gender;
      this.applyFilters();
    },

    sortByPrice(order) {
      this.sortOrder = order;
      this.applyFilters();
    },

    clearAllFilters() {
      this.priceFilter = { min: 0, max: Infinity };
      this.genderFilter = null;
      this.searchQuery = '';
      this.sortOrder = null;
      this.section = null;
      this.category = null;
      this.filteredProducts = [...this.allProducts];
      this.currentPage = 1;
    },

    searchProducts(query) {
      this.searchQuery = query;
      this.applyFilters();
    }
  }
});