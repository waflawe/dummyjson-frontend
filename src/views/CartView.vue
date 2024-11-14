<template>
  <main>
    <div class="h-screen pt-4 pb-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4 text text-dark">Shopping Cart</h1>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="md:w-3/4">
            <div class="bg-gray-50 dark:bg-slate-900 rounded-lg shadow-md p-6 mb-4">
              <table class="w-full">
                <thead>
                <tr>
                  <th class="text-left font-semibold text text-dark">Product</th>
                  <th class="text-left font-semibold text text-dark">Price</th>
                  <th class="text-left font-semibold text text-dark">Quantity</th>
                  <th class="text-left font-semibold text text-dark">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in cart!.products" :key="product.id">
                  <td class="py-4">
                    <div class="flex items-center">
                      <img class="h-16 w-16 mr-4" :src="product.thumbnail" alt="Product Image">
                      <span class="font-semibold text text-dark">{{product.title}}</span>
                    </div>
                  </td>
                  <td class="py-4 text text-dark">${{product.price}}</td>
                  <td class="py-4">
                    <div class="flex items-center">
                      <button class="border rounded-md py-2 px-4 mr-2 text text-dark">-</button>
                      <span class="text-center w-8 text text-dark">{{product.quantity}}</span>
                      <button class="border rounded-md py-2 px-4 ml-2 text text-dark">+</button>
                    </div>
                  </td>
                  <td class="py-4 text text-dark">${{product.discountedTotal}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="md:w-1/4">
            <div class="bg-gray-50 dark:bg-slate-900 rounded-lg shadow-md p-6">
              <h2 class="text-lg font-semibold mb-4 text text-dark">Summary</h2>
              <div class="flex justify-between mb-2 text text-dark">
                <span>Subtotal</span>
                <span>${{cart!.total}}</span>
              </div>
              <div class="flex justify-between mb-2 text text-dark">
                <span>Discount</span>
                <span>${{(cart!.total - cart!.discountedTotal).toFixed(2)}}</span>
              </div>
              <hr class="my-2 text text-dark">
              <div class="flex justify-between mb-2 text text-dark">
                <span class="font-semibold">Total</span>
                <span class="font-semibold">${{cart!.discountedTotal}}</span>
              </div>
              <button class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useCartsStore} from "../stores/cartsStore.ts";
import {IResponse, IResponseCartPaginated, ICart} from "../types";

export default {
  data() {
    return {
      cart: undefined as ICart | undefined
    }
  },
  async beforeMount() {
    const response: IResponse<IResponseCartPaginated> = await this.cartsStore.getMyCart()
    if (response.status) {
      this.cart = response.data.carts[0]
    }
  },
  computed: {
    ...mapStores(useCartsStore)
  }
}
</script>
