<template>
  <li class="todo-item">
    <h5 class="todo-item__title" :class="{'completed': todo.status==='completed'}">{{ todo.title }}</h5>
    <div class="todo-item__controls">
      <button
          class="btn-complete"
          :class="{'completed': todo.status==='completed'}"
          @click.stop="updateTodo(todo.id)"
      >{{ todo.status==='active' ? 'Выполнить' : 'Отмена' }}</button>
      <button class="btn-delete" @click.stop="removeTodo(todo.id)">Удалить</button>
    </div>
    <router-link class="todo-item__link" :to="`/task/${todo.id}`">Открыть</router-link>
  </li>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['removeTodo'],
  setup() {
    const store= useStore()
    const isOpen = ref(false)
    const removeTodo = (id) => {
      store.dispatch('todos/deleteTodo', id)
    }
    const updateTodo = (id) => {
      store.dispatch('todos/updateTodoStatus', id)
    }
    return {
      isOpen,
      removeTodo,
      updateTodo
    }
  }
}
</script>

<style lang="scss">
  .todo-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 3px 3px 3px #eee;
    &__title {
      display: flex;
      align-items: center;
      font-size: 14px;
      &.completed {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          background-color: #000000;
          display: block;
          height: 2px;
          width: calc(100% + 10px);
          transform: translateX(-5px);
        }
      }
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &__spoiler {
      padding-top: 20px;
    }
    &__controls {
      margin-left: auto;
      margin-right: 20px;
    }
    &__link {
      padding: 3px;
      border: 2px solid dodgerblue;
      border-radius: 4px;
      font-size: 14px;
      color: dodgerblue;
      transition: 0.3s;
      &:hover {
        background-color: dodgerblue;
        color: #ffffff;
      }
    }
  }
  
</style>