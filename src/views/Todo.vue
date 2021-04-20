<template>
  <app-page nav>
    <div class="form-wrap">
      <form class="form" @submit.prevent="submitHandler">
        <legend>Заполните поля для добавления задачи</legend>
        <div class="form-control">
          <label for="title">Название</label>
          <input
              class="form-input"
              type="text" id="title"
              placeholder="Введите название задачи"
              v-model.trim="current.title"
              required
          >
        </div>
        <div class="form-control">
          <label for="description">Описание</label>
          <textarea
              class="form-input"
              id="description"
              placeholder="Введите описание задачи"
              v-model.trim="current.description"
              ref="textarea"
              @focus="resize"
              @keyup="resize"
          />
        </div>
        <div class="form-control">
          <label for="date">Дата</label>
          <input
              id="date"
              type="date"
              class="form-input"
              v-model="current.date"
          >
        </div>
        <button class="submit-btn" type="submit" :disabled="!hasChanges">Сохранить</button>
      </form>
    </div>
  </app-page>
  <teleport to="body">
    <app-modal
        v-if="leave"
        :title="`Были произведены изменения. Вы уверены что хотите покинуть страницу?`"
        @close="leave = false"
        @confirm="navigate"
        @reject="leave = false"
        @save="saveAndLeave"
    >
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from "@/components/AppPage";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import TodoForm from "@/components/TodoForm";
import {useLeaveGuard} from "@/use/leaveGuard";
import AppModal from "@/components/AppModal";

export default {
  name: "Task",
  components: {
    AppPage,
    TodoForm,
    AppModal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const textarea = ref()
    const current = ref({})
    const todo = computed(() => store.getters['todos/todo'](+route.params.id))
    current.value = {...todo.value}
    onMounted(() => {
      resize()
    })
    const resize = () => {
      textarea.value.style.height = 'auto'
      textarea.value.style.height = textarea.value.scrollHeight + 'px'
    }
    const hasChanges = computed(() => {
      return current.value.title !== todo.value.title ||
          current.value.date !== todo.value.date ||
          current.value.description !== todo.value.description
    })

    const submitHandler = () => {
      store.dispatch('todos/updateTodo', current.value)
    }

    return {
      current,
      textarea,
      resize,
      hasChanges,
      submitHandler,
      ...useLeaveGuard(hasChanges, submitHandler)
    }
  }
}
</script>

<style lang="scss">

</style>