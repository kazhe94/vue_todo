<template>
  <app-page nav v-if="todo">
    <div class="form-wrap">
      <form class="form" @submit.prevent="submitHandler">
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
        <div class="form-control">
          <label for="priority">Приоритет</label>
          <select class="form-input" id="priority" v-model="current.priority">
            <option :value="option.type" v-for="option in priorityOptions">
              {{option.text}}
            </option>
          </select>
        </div>
        <button class="form-btn" type="submit" :disabled="!hasChanges">Сохранить</button>
      </form>
      <div class="todo-buttons">
        <button
            class="btn-complete"
            :class="todo.status"
            @click="updateTodo"
        >{{ optionMaps.textMap[todo.status] }}</button>
        <button class="btn-delete" @click="removeTodo">Удалить</button>
      </div>
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
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {useStore} from "vuex";
import TodoForm from "@/components/TodoForm";
import {useLeaveGuard} from "@/use/leaveGuard";
import AppModal from "@/components/AppModal";
import optionMaps from "@/optionMaps";

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
    const priorityOptions = computed(() => store.getters['filters/priorityOptions'])
    current.value = {...todo.value}
    onMounted(() => {
      if(textarea.value) {
        resize()
      }
    })
    const resize = () => {
      textarea.value.style.height = 'auto'
      textarea.value.style.height = textarea.value.scrollHeight + 'px'
    }
    const hasChanges = computed(() => {
      if(todo.value) {
        return current.value.title !== todo.value.title ||
            current.value.date !== todo.value.date ||
            current.value.description !== todo.value.description ||
            current.value.priority !== todo.value.priority
      }
    })

    const submitHandler = () => {
      store.dispatch('todos/updateTodo', current.value)
    }
    const removeTodo = () => {
      store.dispatch('todos/deleteTodo', +route.params.id)
      router.replace({name: 'List'})
    }
    const updateTodo = () => {
      store.dispatch('todos/updateTodoStatus', +route.params.id)
    }

    return {
      current,
      todo,
      textarea,
      resize,
      hasChanges,
      submitHandler,
      removeTodo,
      updateTodo,
      priorityOptions,
      optionMaps,
      ...useLeaveGuard(hasChanges, submitHandler)
    }
  }
}
</script>

<style lang="scss">
  .todo-buttons {
    display: flex;
    min-width: 85px;
    margin-left: 30px;
    flex-direction: column;
    align-self: flex-start;
    .btn-complete {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
</style>