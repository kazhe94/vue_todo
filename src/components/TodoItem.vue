<template>
  <li class="todo-item">
    <div>{{idx}}</div>
    <div>{{todo.title}}</div>
    <div>{{new Date(todo.date).toLocaleDateString()}}</div>
    <div>{{priority.text}}</div>
    <div>{{statusMap[todo.status]}}</div>
    <div>
      <button
        class="btn-complete"
        :class="todo.status"
        @click.stop="updateTodo(todo.id)"
      >
        {{ textMap[todo.status] }}
      </button>
    </div>
    <div>
      <button class="btn-delete" @click.stop="removeTodo(todo.id)">Удалить</button>
    </div>
    <div>
      <router-link class="todo-item__link" :to="`/task/${todo.id}`">Открыть</router-link>
    </div>
  </li>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      default: 1
    }
  },
  emits: ['removeTodo'],
  setup(props) {
    const store= useStore()
    const isOpen = ref(false)
    const removeTodo = (id) => {
      store.dispatch('todos/deleteTodo', id)
    }
    const updateTodo = (id) => {
      store.dispatch('todos/updateTodoStatus', id)
    }
    const textMap = {
      'expired': 'Выполнить',
      'active': 'Выполнить',
      'completed': 'В работу'
    }
    const statusMap = {
      'expired': 'Просрочено',
      'active': 'Активно',
      'completed': 'Завершено'
    }
    const priority = computed(() => store.getters['filters/priorityOptions'].find(el => el.type === props.todo.priority))
    return {
      isOpen,
      removeTodo,
      updateTodo,
      textMap,
      statusMap,
      priority
    }
  }
}
</script>

<style lang="scss">
  .todo-item {
    border-bottom: 1px solid #cccccc;
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