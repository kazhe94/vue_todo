<template>
  <div class="app-page">
    <h1 class="title">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .app-page {
    padding: 30px 0;
  }
</style>