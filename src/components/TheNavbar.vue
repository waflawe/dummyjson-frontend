<template>
  <nav class="fixed top-0 left-0 w-full h-14 bg-slate-100 bg-opacity-100 shadow-xl dark:bg-slate-900">
    <div class="h-full place-items-center flex">
      <RouterLink :to="{name: 'home'}" class="ms-10 text text-dark text-2xl">
        <p class="sawarabi flex"><img width="30" height="30" src="https://img.icons8.com/fluency/30/pixel-heart.png" alt="pixel-heart"/>dummyJSON</p>
      </RouterLink>
      <RouterLink :to="{name: 'products'}" class="ms-10 text text-dark text-2xl">
        <p class="sawarabi">Products</p>
      </RouterLink>
      <div class="ms-auto me-10">
        <RouterLink :to="{name: 'login'}" v-if="!authStore.isAuth">
          <button class="nav-btn" type="button">Login</button>
        </RouterLink>
        <button class="nav-btn" type="button" v-if="authStore.isAuth" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useAuthenticationStore} from "../stores/authenticationStore.ts";

export default {
  methods: {
    logout() {
      if (this.authStore.isAuth) {
        this.authStore.logout()
        this.$router.push({name: 'home'})
      }
    }
  },
  computed: {
    ...mapStores(useAuthenticationStore)
  }
}
</script>
