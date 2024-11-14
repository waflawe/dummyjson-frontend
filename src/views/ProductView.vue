<template>
  <main class="relative">
    <div class="loader" v-if="loading"></div>
    <div class="py-8" v-if="product">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div class="h-[465px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 flex text-gray-50">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-10 mt-auto my-auto"
                  :class="{'opacity-100 cursor-pointer': activeImage > 0, 'opacity-0': activeImage <= 0}"
                  @click="prevImage"
              >
                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
              </svg>
              <img class="w-full h-full object-cover" :src="product!.images[activeImage]" alt="Product Image">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-10 ms-auto my-auto"
                  :class="{'opacity-100 cursor-pointer': activeImage + 1 < product!.images.length, 'opacity-0': activeImage + 1 >= product!.images.length}"
                  @click="nextImage"
              >
                <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-1">{{product!.title}}</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {{categoryToHumanReadable(product!.category)}}
              <span class="flex gap-1">
              <span class="text-2xl font-bold text-gray-800 dark:text-white mt-4">{{product!.rating}}</span>
              <span class="flex items-center mt-4">
                <AppRatingStars :rating="+product!.rating"/>
              </span>
            </span>
            </p>
            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                <span class="text-gray-600 dark:text-gray-300 font-semibold">${{product!.price}} <span class="line-through text-gray-700 dark:text-gray-400 font-normal">${{(product!.price * (1 + product!.discountPercentage / 100)).toFixed(2)}}</span></span>
              </div>
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {{product!.description}}
              </p>
            </div>
            <div class="flex -mx-2 mb-4 mt-4">
              <div class="w-1/2 px-2">
                <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
              </div>
              <div class="w-1/2 px-2">
                <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="text text-dark text-3xl">Reviews ({{ product!.reviews.length }})</div>
          <div class="mb-3 ms-1.5" v-for="review in product!.reviews" :key="review.reviewerEmail">
            <p class="flex items-baseline">
              <span class="text-gray-600 font-bold">{{review.reviewerName}}</span>
              <span class="ml-2 text-commented text-xs">{{review.reviewerEmail}}</span>
            </p>
            <div class="flex items-center mt-1">
              <AppRatingStars :rating="+review.rating"/>
            </div>
            <div class="mt-1">
              <p class="mt-1 text text-dark">{{review.comment}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {IProductDetail, IResponse} from "../types";
import {mapStores} from "pinia";
import {useProductsStore} from "../stores/productsStore.ts";
import {humanReadableCategory} from "../helpers";
import AppRatingStars from "../components/AppRatingStars.vue";

export default {
  components: {AppRatingStars},
  data() {
    return {
      product: undefined as IProductDetail | undefined,
      activeImage: 0 as number,
      loading: false as boolean
    }
  },
  methods: {
    categoryToHumanReadable(categorySlug: string) {
      return humanReadableCategory(categorySlug)
    },
    prevImage() {
      if (this.activeImage > 0) {
        this.activeImage--
      }
    },
    nextImage() {
      if (this.activeImage + 1 < this.product!.images.length) {
        this.activeImage++
      }
    },
  },
  async mounted() {
    this.loading = true
    const response: IResponse<IProductDetail> = await this.productsStore.getProduct(+this.$route.params.id)
    if (response.status) {
      this.product = response.data
    }
    this.loading = false
  },
  computed: {
    ...mapStores(useProductsStore)
  }
}
</script>
