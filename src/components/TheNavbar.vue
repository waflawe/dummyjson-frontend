<template>
  <nav class="fixed top-0 left-0 w-full h-14 bg-slate-100 bg-opacity-100 shadow-xl dark:bg-slate-900">
    <div class="h-full place-items-center flex">
      <RouterLink :to="{name: 'home'}" class="ms-10 text text-dark text-2xl">
        <p class="sawarabi flex"><img width="30" height="30" src="https://img.icons8.com/fluency/30/pixel-heart.png" alt="pixel-heart"/>dummyJSON</p>
      </RouterLink>
      <RouterLink :to="{name: 'products'}" class="ms-10 text text-dark text-2xl">
        <p class="sawarabi">Products</p>
      </RouterLink>
      <RouterLink :to="{name: 'cart'}" class="ms-10 text text-dark text-2xl" v-if="authStore.isAuth">
        <p class="sawarabi">Cart</p>
      </RouterLink>
      <div class="ms-auto me-10 flex">
        <button class="mr-3 text text-dark" type="button" @click="toggleTheme">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" v-if="theme === 'light'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" v-if="theme === 'dark'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>
        <RouterLink :to="{name: 'login'}" v-if="!authStore.isAuth">
          <button class="nav-btn" type="button">Login</button>
        </RouterLink>
        <div class="flex" v-if="authStore.isAuth">
          <div class="rounded-full my-auto mr-3 size-[30px]">
            <img :src="authStore.user.image" alt="User Image">
          </div>
          <button class="nav-btn" type="button" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useAuthenticationStore} from "../stores/authenticationStore.ts";

export default {
  data() {
    return {
      theme: 'light'
    }
  },
  methods: {
    toggleTheme() {
      const currentTheme = document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', currentTheme ? 'dark' : 'light')
      this.theme = currentTheme ? 'dark' : 'light'
    },
    logout() {
      if (this.authStore.isAuth) {
        this.authStore.logout()
        this.$router.push({name: 'home'})
      }
    }
  },
  beforeMount() {
    this.authStore.init()
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.theme = 'dark'
    }
  },
  computed: {
    ...mapStores(useAuthenticationStore)
  }
}
</script>
