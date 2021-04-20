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

export default {
  name: "Home",
  components: {
    AppPage,
    TodoForm
  }
}
</script>

<style lang="scss">
  .form-wrap {
    display: flex;
    justify-content: center;
  }
</style>