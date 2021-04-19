<template>
  <div class="filter">
    <p
        class="option__text"
        @click="$emit('openFilter')"
    >{{ modelValue.text }} <slot name="count"/> <span>&#9660;</span></p>
    <ul
        class="option__list"
        v-if="open"
    >
      <li
          class="option__item"
          v-for="option in options"
          :key="option.type"
          @click="$emit('update:modelValue', option), $emit('close')"
      >{{ option.text }}</li>
    </ul>
    <slot name="reverse"/>
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

<style lang="scss">
  .filter {
    position: relative;
    &:first-child {
      margin-left: 0;
      margin-right: auto;
    }
  }
</style>