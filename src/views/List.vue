<template>
  <app-page title="Список задач">
    <ul class="todo-list">
      <li class="todo-item" v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "List",
  components: {
    AppPage
  },
  setup() {
    const store = useStore()

    const todos = computed(() => store.getters['todos/todos'])
    console.log(todos.value)
    return {
      todos
    }
  }
}
</script>

<style scoped>

</style>