<template>
  <app-page>

  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Task",
  components: {
    AppPage
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const todo = computed(() => store.getters['todos/todo'](+route.params.id))
    console.log(todo.value)
  }
}
</script>

<style scoped>

</style>