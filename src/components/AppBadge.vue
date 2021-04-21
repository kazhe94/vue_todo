<template>
  <span class="badge" :class="color">{{status}}</span>
</template>

<script>
export default {
  name: "AppBadge",
  props: {
    status: {
      type: String
    },
    color: {
      type: String
    }
  },
  setup(props) {
    console.log(props.color)
  }
}
</script>

<style lang="scss">
  .badge {
    padding: 4px 10px;
    border: 1px solid #000000;
    border-radius: 32px;
    &.expired {
      color: red;
      border-color: red;
    }
    &.active {
      color: green;
      border-color: green;
    }
    &.completed {
      color: #ffc200;
      border-color: #ffc200;
    }
  }
</style>