<template>
  <app-page title="Список задач">
    <div class="filters">
      <p class="sort" @click="sort = !sort">Сортировать по названию</p>
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
import {computed, ref, watch} from "vue";
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
    const sort = ref(null)
    const filterOptions = [
      {type: 'all', status: 'Все задачи'},
      {type: 'active', status: 'Активные'},
      {type: 'completed', status: 'Завершённые'}
    ]
    const todos = computed(() => store.getters['todos/todos']
        .filter(item => {
          return filter.value.type !== 'all' ? item.status === filter.value.type : item
        })
        .sort((a, b) => {
          if(sort.value) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
          }
          if(sort.value === false) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
          }
          return
        })
    )
    console.log(todos.value)

    return {
      todos,
      filter,
      filterOptions,
      filterOpened,
      sort
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
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
  }
  .sort {
    display: inline-block;
    cursor: pointer;
  }
</style>