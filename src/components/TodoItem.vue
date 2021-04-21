<template>
  <li class="todo-item">
    <div>{{idx}}</div>
    <div class="todo-item__title" :class="{'completed': todo.status === 'completed'}"><span>{{todo.title}}</span></div>
    <div>{{todo.date ? new Date(todo.date).toLocaleDateString() : ''}}</div>
    <div>{{priority.text}}</div>
    <div class="todo-item__status">{{optionMaps.statusMap[todo.status]}}</div>
    <div>
      <button
        class="btn-complete"
        :class="todo.status"
        @click.stop="updateTodo(todo.id)"
      >
        &#10004;
      </button>
    </div>
    <div>
      <button class="btn-delete" @click.stop="removeTodo(todo.id)">x</button>
    </div>
    <div>
      <router-link class="todo-item__link" :to="`/task/${todo.id}`">Открыть</router-link>
    </div>
  </li>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import optionMaps from "@/optionMaps";

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
    const priority = computed(() => store.getters['filters/priorityOptions'].find(el => el.type === props.todo.priority))
    return {
      isOpen,
      removeTodo,
      updateTodo,
      priority,
      optionMaps
    }
  }
}
</script>

<style lang="scss">
  .todo-item {
    &:not(:last-child) {
      border-bottom: 1px solid #cccccc;
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
    .btn-delete {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    &__title {
      padding: 20px!important;
      max-width: 400px;
      span {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-5px, -50%);
          display: block;
          width: calc(100% + 10px);
          height: 2px;
          background-color: #000000;
        }
      }
    }
    &__status {
      width: 132px;
    }
  }
  
</style>