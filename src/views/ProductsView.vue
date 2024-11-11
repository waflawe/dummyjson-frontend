<template>
  <main>
    <div class="grid grid-cols-3 mx-20">
      <div class="col-span-1" v-for="product in products" :key="product.id">
        <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          <img class="h-48 w-full object-cover object-center" :src="product.thumbnail" alt="Product Image" />
          <div class="p-4">
            <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{{product.title}}</h2>
            <p class="mb-2 text-sm dark:text-gray-300 text-gray-700">{{product.description}}</p>
            <div class="flex items-center">
              <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${{product.price}}</p>
              <p class="text-base font-medium text-gray-500 line-through dark:text-gray-300">${{(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}}</p>
              <p class="ml-auto text-base font-medium text-green-500">{{product.discountPercentage}}% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useProductsStore} from "../stores/productsStore.ts";
import {IProduct, IResponse, IResponseProductPaginated} from "../types";

export default {
  data() {
    return {
      products: [] as Array<IProduct>,
      total: 0 as number
    }
  },
  async mounted() {
    const response: IResponse<IResponseProductPaginated> = await this.productsStore.getProducts()
    if (response.status) {
      this.products = response.data.products
      this.total = response.data.total
    }
  },
  computed: {
    ...mapStores(useProductsStore)
  }
}
</script>
