<template>
  <nav class="fixed top-0 left-0 w-full h-14 bg-slate-100 bg-opacity-100 shadow-xl">
    <div class="h-full grid grid-cols-12 place-items-center">
      <RouterLink :to="{name: 'home'}" class="text text-2xl col-span-2">
        <p class="sawarabi">dummyJSON</p>
      </RouterLink>
      <div class="col-span-8"></div>
      <div class="col-span-2">
        <RouterLink :to="{name: 'login'}">
          <button class="nav-btn text-lg" type="button">Login</button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {}
</script>
