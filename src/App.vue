<template>
  <div class="mt-14">
    <RouterView/>
  </div>
  <TheNavbar/>
</template>

<script lang="ts">
import TheNavbar from './components/TheNavbar.vue'

export default {
  components: {TheNavbar}
}
</script>
