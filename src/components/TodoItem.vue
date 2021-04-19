<template>
  <li class="todo-item">
    <div class="todo-item__visible" @click="isOpen = !isOpen">
      <h3 class="todo-item__title" :class="{'completed': todo.status==='completed'}">{{ todo.title }}</h3>
      <div class="todo-item__controls">
        <button
            class="btn-complete"
            :class="{'completed': todo.status==='completed'}"
            @click.stop="updateTodo(todo.id)"
        >{{ todo.status==='active' ? 'Выполнить' : 'Отмена' }}</button>
        <button class="btn-delete" @click.stop="removeTodo(todo.id)">Удалить</button>
      </div>
    </div>
    <div class="todo-item__spoiler" v-if="isOpen">
      <p class="todo-item__description">{{ todo.description }}</p>
    </div>
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

<style scoped lang="scss">
  .todo-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 3px 3px 3px #eee;
    &__title {
      &.completed {
        text-decoration: line-through;
      }
    }
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
    &.completed {
      background-color: #ffc200;
    }
  }
  .btn-delete {
    border-radius: 4px;
    background-color: red;
    height: 100%;
    color: #ffffff;
  }
  
</style>