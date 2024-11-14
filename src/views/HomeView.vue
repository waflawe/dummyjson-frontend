<template>
  <main class="h-screen overflow-hidden">
    <div class="relative w-full h-screen overflow-hidden">
      <img src="https://png.pngtree.com/background/20230614/original/pngtree-image-of-shopping-mall-ecommerce-with-an-isometric-background-picture-image_3476197.jpg" alt=""
           class="absolute inset-0 w-full h-screen object-cover">
      <div
          class="pt-36 puritan absolute inset-0 z-10 text-white text-center
                 h-full w-full bg-black bg-opacity-70">
        <p class="text text-dark text-8xl">Welcome to the<br>dummyJSON frontend!</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  mounted() {
    document.body.style.overflow = 'hidden';
  },
  unmounted() {
    document.body.style.overflow = '';
  }
}
</script>
