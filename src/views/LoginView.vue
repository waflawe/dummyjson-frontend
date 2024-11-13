<template>
  <main>
    <div class="max-w-md mx-auto mt-24">
      <form class="p-4" @submit.prevent="submit" @keyup.enter="submit">
        <div class="text text-dark text-center text-3xl poppins">Log in</div>
        <div class="text-commented text-center text-lg poppins">
          Users availible <a href="https://dummyjson.com/users" class="link" target="_blank">here</a>
        </div>
        <div class="mb-4">
          <label class="block text text-dark font-bold mb-2">Username</label>
          <input type="text" class="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm focus:outline-none
          focus:border-blue-500 placeholder-slate-500" placeholder="Enter your username" v-model="username">
        </div>
        <div class="mb-4">
          <label class="block text text-dark font-bold mb-2">Password</label>
          <input type="password" class="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm focus:outline-none
          focus:border-blue-500 placeholder-slate-500" placeholder="Enter your password" v-model="password">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-800
          focus:outline-none focus:shadow-outline-blue transition duration-200 ease-in-out disabled:bg-blue-800
          disabled:text-slate-400" :disabled="!isValid">Log in</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import {mapStores} from "pinia";
import {useAuthenticationStore} from '../stores/authenticationStore.ts'

export default {
  data() {
    return {
      username: '' as string,
      password: '' as string,
    }
  },
  methods: {
    async submit() {
      if (this.isValid) {
        const status: boolean = await this.authStore.login(this.username, this.password)

        switch (status) {
          case true:
            this.$router.push({name: 'products'})
            break
          case false:
            console.log("error")
            break
        }
      }
    }
  },
  computed: {
    isValid() {
      return this.username.length && this.password.length
    },

    ...mapStores(useAuthenticationStore)
  }
}
</script>
