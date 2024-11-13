<template>
  <main>
    <div class="mb-10 mx-10 gap-5 flex relative">
      <div class="w-1/4 mt-5 relative">
        <div class="sticky top-0 left-0 border border-gray-500 rounded-xl h-screen overflow-y-auto">
          <div class="mx-1" @click="changeCategory('')">
            <div class="hover:bg-gray-600 hover:rounded-lg bg-transparent py-1 cursor-pointer w-full mt-0.5">
              <div class="ml-3 text text-dark text-lg">
                All
              </div>
            </div>
          </div>

          <div class="mx-1" v-for="category in categories" :key="category.slug" @click="changeCategory(category.slug)">
            <div class="hover:bg-gray-600 hover:rounded-lg bg-transparent py-1 cursor-pointer w-full">
              <div class="ml-3 text text-dark text-lg">
                {{category.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/4 mt-5">
        <div class="inline-flex flex-col justify-center relative text-gray-500 w-full">
          <div class="relative w-full">
            <input type="text"
                   class="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none
               focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-full" placeholder="Search..." v-model="search"
            />
            <svg class="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <div class="w-full" v-if="searchResults.length">
            <ul class="bg-white border border-gray-100 w-full mt-2">
              <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                <b>Gar</b>dameer - Italië
              </li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-3 mt-1 gap-x-10 gap-y-0">
          <div class="col-span-1 w-full h-full" v-for="product in products" :key="product.id">
            <div class="mx-auto mt-6 w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <img class="h-48 w-full object-cover object-center" :src="product.thumbnail" alt="Product Image" />
              <div class="p-4">
                <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{{product.title}}</h2>
                <p class="text-sm dark:text-gray-300 text-gray-700">{{product.description}}</p>
                <p class="text-commented text-sm mb-2">{{ humanReadableCategory(product.category) }}</p>
                <div class="flex items-center">
                  <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${{product.price}}</p>
                  <p class="text-base font-medium text-gray-500 line-through dark:text-gray-300">${{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}}</p>
                  <p class="ml-auto text-base font-medium text-green-500">{{product.discountPercentage}}% off</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mx-auto px-4 mt-5">
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
import {IProduct, IResponse, IResponseProductPaginated, ICategory} from "../types";

export default {
  data() {
    return {
      products: [] as Array<IProduct>,
      searchResults: [] as Array<IProduct>,
      search: '' as string,
      categories: [] as Array<ICategory>,
      totalPages: 0 as number,
      activePage: 1 as number
    }
  },
  methods: {
    async getProducts(categorySlug: string = '', page: number = 1) {
      const response: IResponse<IResponseProductPaginated> = await this.productsStore.getProducts(categorySlug, ((page - 1) * 51))
      if (response.status) {
        this.products = response.data.products
        this.totalPages = Math.ceil(response.data.total / 51)
        this.activePage = page
      }
    },
    async getCategories() {
      const response: IResponse<Array<ICategory>> = await this.productsStore.getCategories()
      if (response.status) {
        this.categories = response.data
      }
    },
    changeCategory(categorySlug: string) {
      this.$router.push({name: 'products', query: {'category': categorySlug, 'page': 1}})
    },
    humanReadableCategory(categorySlug: string) {
      let res: string = ''
      for (let i = 0; i < categorySlug.length; i++) {
        if (i === 0) {
          res += (categorySlug[0] as string).toUpperCase()
        } else if (categorySlug[i] === '-') {
          res += ' '
        } else if (categorySlug[i - 1] === '-') {
          res += (categorySlug[i] as string).toUpperCase()
        } else {
          res += categorySlug[i]
        }
      }
      return res
    },
    changePage(page: number) {
      if (page <= this.totalPages && page > 0) {
        this.$router.push({name: 'products', query: {'category': this.$route.query.category ?? '', 'page': page}})
      }
    },
    getPagePaginationClasses(page: number) {
      if (page === this.activePage) {
        return {'border-black dark:border-white dark:bg-black pointer-events-none': true}
      } else {
        return {'border-gray-200 bg-white dark:bg-gray-700 text-black hover:border-gray-300 dark:hover:border-gray-600': true}
      }
    }
  },
  async mounted() {
    if (this.$route.query.category?.length) {
      const category = this.$route.query.category
      await this.getProducts(category as string)
    } else if (this.$route.query.page?.length) {
      await this.getProducts('', +this.$route.query.page)
    } else {
      await this.getProducts()
    }
    await this.getCategories()
  },
  watch: {
    async '$route'(to, from) {
      if (to.query.category !== from.query.category) {
        const category = to.query.category
        await this.getProducts(category as string, to.query.page)
      } else if (to.query.page !== from.query.page) {
        const page = to.query.page
        await this.getProducts(to.query.category, page as number)
      }
    }
  },
  computed: {
    ...mapStores(useProductsStore)
  }
}
</script>
