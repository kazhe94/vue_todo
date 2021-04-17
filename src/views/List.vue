<template>
  <app-page title="Список задач">
    <div class="filters">
      <app-sort></app-sort>
      <app-filter
          v-model="filter"
          :options="filterOptions"
          :open="filterOpened"
          @openFilter="filterOpened = !filterOpened"
          @close="filterOpened = false"
      ></app-filter>
    </div>
    <ul class="todo-list" v-if="todos.length">
      <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
      ></todo-item>
    </ul>
    <h3 v-else>Задач пока нет, добавьте <router-link class="todo-list__link" to="/">новую</router-link></h3>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import TodoItem from "@/components/TodoItem";
import AppSort from "@/components/AppSort";
import AppFilter from "@/components/AppFilter";

export default {
  name: "List",
  components: {
    AppPage,
    TodoItem,
    AppSort,
    AppFilter
  },
  setup() {
    const store = useStore()
    const filterOpened = ref(false)
    const filter = ref({
      type: 'all',
      status: 'Все задачи'
    })
    const sort = ref()
    const filterOptions = [
      {type: 'all', status: 'Все задачи'},
      {type: 'active', status: 'Активные'},
      {type: 'completed', status: 'Завершённые'}
    ]

    const todos = computed(() => store.getters['todos/todos'])
    // console.log(todos.value)
    return {
      todos,
      filter,
      filterOptions,
      filterOpened
    }
  }
}
</script>

<style scoped lang="scss">
  h3 {
    text-align: center;
  }
  .todo-list__link {
    color: dodgerblue;
    border-bottom: 1px solid transparent;
    transition: 0.3s;
    &:hover {
      border-color: dodgerblue;
    }
  }
  .filters {
    margin-bottom: 10px;
  }
</style>