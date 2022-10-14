<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Nav from './components/Nav.vue';
</script>

<template>
  <header>
    <Nav></Nav>
  </header>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
