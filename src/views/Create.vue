<template>
  <app-page title="Добавить задачу">
    <div class="form-wrap">
      <todo-form></todo-form>
    </div>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import TodoForm from "@/components/TodoForm";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Home",
  components: {
    AppPage,
    TodoForm
  },
  setup() {
    const store = useStore()
    // const todos = computed(() => store.getters['todos/todos'])
    // console.log(todos.value)
  }
}
</script>

<style lang="scss">
  .form-wrap {
    display: flex;
    justify-content: center;
  }
</style>