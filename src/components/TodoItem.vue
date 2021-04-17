<template>
  <li class="todo-item">
    <div class="todo-item__visible" @click="isOpen = !isOpen">
      <h3 class="todo-title">{{ todo.title }}</h3>
      <div class="todo-item__controls">
        <button class="btn-complete">Выполнить</button>
        <button class="btn-delete">Удалить</button>
      </div>
    </div>
    <div class="todo-item__spoiler" v-if="isOpen">
      <p class="todo-item__description">{{ todo.description }}</p>
    </div>
  </li>
</template>

<script>
import {ref} from "vue";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    return {
      isOpen
    }
  }
}
</script>

<style scoped lang="scss">
  .todo-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 3px 3px 3px #eee;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &__visible {
      display: flex;
      justify-content: space-between;
    }
    &__spoiler {
      padding-top: 20px;
    }
  }
  .btn-complete {
    border-radius: 4px;
    background-color: green;
    height: 100%;
    color: #ffffff;
    margin-right: 10px;
  }
  .btn-delete {
    border-radius: 4px;
    background-color: red;
    height: 100%;
    color: #ffffff;
  }
</style>