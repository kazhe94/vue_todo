<template>
  <div class="app-page">
    <div class="todo-nav" v-if="nav">
      <button class="nav-btn" @click="$router.back()">Назад</button>
    </div>
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
    },
    nav: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .app-page {
    padding: 30px 0;
  }
  .title {
    margin-bottom: 30px;
  }
  .nav-btn {
    padding: 5px;
    border-radius: 4px;
    background-color: dodgerblue;
    color: #ffffff;
  }
</style>