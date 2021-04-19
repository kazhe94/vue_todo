<template>
  <div class="filter">
    <p
        class="filter__title"
        @click="$emit('openFilter')"
    >{{ modelValue.status }} <span>&#9660;</span></p>
    <ul
        class="filter__list"
        v-if="open"
    >
      <li
          class="filter__item"
          v-for="option in options"
          :key="option.type"
          @click="$emit('update:modelValue', option), $emit('close')"
      >{{ option.status }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppFilter",
  props: ['modelValue', 'options', 'open'],
  emits: ['update:modelValue', 'openFilter', 'close'],
  setup() {

  }
}
</script>

<style scoped lang="scss">
  .filter {
    position: relative;
    &__title {
      cursor: pointer;
    }
    &__list {
      position: absolute;
      z-index: 10;
      background-color: #fff;
      display: inline-block;
      border: 1px solid #ccc;
    }
    &__item {
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
  }
</style>