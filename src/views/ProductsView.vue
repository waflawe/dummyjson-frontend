<template>
  <main class="relative">
    <div class="loader" v-if="productsLoading || categoriesLoading"></div>
    <div class="mb-10 mx-10 gap-5 flex relative">
      <div class="w-1/4 mt-5 relative">
        <div class="sticky top-0 left-0 border border-gray-400 rounded-xl h-screen overflow-y-auto">
          <div class="mx-1" @click="changeCategory('')">
            <div class="hover:bg-gray-300 dark:hover:bg-gray-600 hover:rounded-lg bg-transparent py-1 cursor-pointer w-full mt-0.5">
              <div class="ml-3 text text-dark text-lg">
                All
              </div>
            </div>
          </div>

          <div class="mx-1" v-for="category in categories" :key="category.slug" @click="changeCategory(category.slug)">
            <div class="hover:bg-gray-300 dark:hover:bg-gray-600 hover:rounded-lg bg-transparent py-1 cursor-pointer w-full">
              <div class="ml-3 text text-dark text-lg">
                {{category.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4 mt-5">
        <div class="flex gap-5">
          <div class="inline-flex flex-col justify-center relative text-gray-500 dark:text-gray-400 w-full">
            <div class="relative w-full">
              <input type="text"
                     class="p-2 pl-8 rounded border border-gray-400 bg-gray-200 focus:outline-none
               focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-full dark:bg-[#20293A]" placeholder="Search..." v-model="search" @keyup.enter="searchProduct"
              />
              <svg class="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <AppDropdown :options="sortOptions" default-option="titleAsc" default-sort="asc" @optionChanged="optionChanged"/>
        </div>
        <div class="grid grid-cols-3 mt-1 gap-x-10 gap-y-0">
          <router-link :to="{name: 'product', params: {'id': product.id}}" class="col-span-1 w-full h-full" v-for="product in products" :key="product.id">
            <div class="mx-auto mt-6 w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <img class="h-48 w-full object-cover object-center" :src="product.thumbnail" alt="Product Image" />
              <div class="p-4">
                <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{{product.title}}</h2>
                <p class="text-sm dark:text-gray-300 text-gray-700">{{product.description}}</p>
                <p class="text-commented text-sm mb-2">{{ categoryToHumanReadable(product.category) }}</p>
                <div class="flex items-center">
                  <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${{product.price}}</p>
                  <p class="text-base font-medium text-gray-500 line-through dark:text-gray-300">${{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}}</p>
                  <p class="ml-auto text-base font-medium text-green-500">{{product.discountPercentage}}% off</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div class="container mx-auto px-4 mt-5" v-if="isPaginationPossible">
          <nav class="flex flex-row flex-nowrap justify-between md:justify-center items-center">
            <div
                class="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 cursor-pointer
                text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                @click="changePage(activePage - 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="block w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>

            <div
                class="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border dark:text-white cursor-pointer"
                :class="getPagePaginationClasses(page)"
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)"
            >{{page}}</div>   <!-- FIX PAGINATION ACTIVE PAGE BUG -->

            <div
                class="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800
                text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
                @click="changePage(activePage + 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="block w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useProductsStore} from "../stores/productsStore.ts";
import {
  ICategory,
  IProduct,
  IResponse,
  IResponseProductPaginated,
  ISortOptions,
  ProductsOrder,
  ProductsSort
} from "../types";
import {LocationQueryRaw} from "vue-router";
import AppDropdown from "../components/AppDropdown.vue";
import {humanReadableCategory} from "../helpers";

export default {
  components: {AppDropdown},
  data() {
    return {
      products: [] as Array<IProduct>,
      search: '' as string,
      categories: [] as Array<ICategory>,
      totalPages: 0 as number,
      activePage: 1 as number,
      isPaginationPossible: true as boolean,
      productsLoading: false as boolean,
      categoriesLoading: false as boolean,
      sortOptions: {
        titleAsc: 'Product title',
        titleDesc: 'Product title',
        ratingAsc: 'Product rating',
        ratingDesc: 'Product rating',
        priceAsc: 'Product price',
        priceDesc: 'Product price',
        discountPercentageAsc: 'Product discount',
        discountPercentageDesc: 'Product discount'
      } as ISortOptions
    }
  },
  methods: {
    async getProducts(categorySlug: string = '', page: number = 1, sortBy: ProductsSort = ProductsSort.TITLE, order: ProductsOrder = ProductsOrder.ASC) {
      this.productsLoading = true
      const response: IResponse<IResponseProductPaginated> = await this.productsStore.getProducts(categorySlug, ((page - 1) * 51), sortBy, order)
      if (response.status) {
        this.products = response.data.products
        this.totalPages = Math.ceil(response.data.total / 51)
        this.activePage = page
        this.isPaginationPossible = true
      }
      this.productsLoading = false
    },
    async searchProducts(search: string) {
      this.productsLoading = true
      const response: IResponse<IResponseProductPaginated> = await this.productsStore.searchProducts(search)
      if (response.status) {
        this.products = response.data.products
        this.totalPages = Math.ceil(response.data.total / 51)
        this.isPaginationPossible = false
      }
      this.productsLoading = false
    },
    async getCategories() {
      this.categoriesLoading = true
      const response: IResponse<Array<ICategory>> = await this.productsStore.getCategories()
      if (response.status) {
        this.categories = response.data
      }
      this.categoriesLoading = false
    },
    categoryToHumanReadable(categorySlug: string) {
      return humanReadableCategory(categorySlug)
    },
    getPagePaginationClasses(page: number) {
      if (page === this.activePage) {
        return {'border-black dark:border-white dark:bg-black pointer-events-none': true}
      } else {
        return {'border-gray-200 bg-white dark:bg-gray-700 text-black hover:border-gray-300 dark:hover:border-gray-600': true}
      }
    },
    changePage(page: number) {
      if (page <= this.totalPages && page > 0) {
        let query: LocationQueryRaw = {page, 'sortBy': this.$route.query.sortBy ?? ProductsSort.TITLE, 'order': this.$route.query.order ?? ProductsOrder.ASC}
        if (this.$route.query.category) {query.category = this.$route.query.category as string}
        this.$router.push({name: 'products', query})
      }
    },
    changeCategory(categorySlug: string) {
      this.$router.push({name: 'products', query: {'category': categorySlug, 'page': 1, 'sortBy': this.$route.query.sortBy ?? ProductsSort.TITLE, 'order': this.$route.query.order ?? ProductsOrder.ASC}})
    },
    searchProduct() {
      if (this.search.length) {
        this.$router.push({name: 'products', query: {'search': this.search}})
      }
    },
    optionChanged(newOption: string) {
      let query = {
        ...this.$route.query,
        ...{
          'sortBy': (newOption.endsWith('Asc') ? newOption.slice(0, -3) : newOption.slice(0, -4)),
          'order': (newOption.endsWith('Asc') ? ProductsOrder.ASC : ProductsOrder.DESC)
        }
      }
      this.$router.push({name: 'products', query})
    }
  },
  async mounted() {
    if (this.$route.query.search?.length) {
      await this.searchProducts((this.$route.query.search as string))
    } else {
      const category: string = this.$route.query.category?.length ? (this.$route.query.category as string) : ''
      const page: number = this.$route.query.page?.length ? +this.$route.query.page : 1
      await this.getProducts(category, page, this.$route.query.sortBy ?? ProductsSort.TITLE, this.$route.query.order ?? ProductsOrder.ASC)
    }
    await this.getCategories()
  },
  watch: {
    async '$route'(to, from) {
      if (to.query.search?.length) {
        await this.searchProducts(to.query.search)
      } else {
        const page: number = ((to.query.category !== from.query.category) || (to.query.search !== from.query.search)) ? 1 : to.query.page
        await this.getProducts(to.query.category ?? '', page, to.query.sortBy ?? ProductsSort.TITLE, to.query.order ?? ProductsOrder.ASC)
      }
    }
  },
  computed: {
    ...mapStores(useProductsStore)
  }
}
</script>
