<template>
  <the-navbar></the-navbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>

import TheNavbar from "@/components/TheNavbar";

export default {
  name: 'App',
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">

</style>
