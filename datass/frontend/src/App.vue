<template>
  <div id="app">
    <NavbarView></NavbarView>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarView from './layouts/NavbarView.vue';

export default {
  name: 'app',
  components: {
    NavbarView,
  },
};
</script>

<style>

</style>
