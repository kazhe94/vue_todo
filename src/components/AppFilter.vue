<template>
  <div class="filter">
    <p
        class="option__text"
        @click="$emit('openFilter')"
    >{{ filter.text }} <slot name="count"/> <span>&#9660;</span></p>
    <ul
        class="option__list"
        v-if="open"
    >
      <li
          class="option__item"
          v-for="option in options"
          :key="option.type"
          @click="$emit('setFilter', option.type), $emit('close')"
      >{{ option.text }}</li>
    </ul>
    <slot name="reverse"/>
  </div>
</template>

<script>
export default {
  name: "AppFilter",
  props: {
    filter: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['setFilter', 'openFilter', 'close'],
}
</script>

<style lang="scss">
  .filter {
    position: relative;
    &:first-child {
      margin-left: 0;
      margin-right: auto;
    }
  }
</style>