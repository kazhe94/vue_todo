<template>
  <form class="form" @submit.prevent="submitHandler">
    <h3>Заполните поля для добавления задачи</h3>
    <div class="form-control">
      <label for="title">Название</label>
      <input
          class="form-input"
          type="text" id="title"
          placeholder="Введите название задачи"
          v-model.trim="title"
          required
      >
    </div>
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
          class="form-input"
          id="description"
          placeholder="Введите описание задачи"
          v-model.trim="description"
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
          v-model="date"
      >
    </div>
    <div class="form-control">
      <label for="priority">Приоритет</label>
      <select class="form-input" id="priority" v-model="priority">
        <option :value="option.type" v-for="option in priorityOptions">
          {{option.text}}
        </option>
      </select>
    </div>
    <button class="form-btn" type="submit" :disabled="!title.length">Добавить</button>
  </form>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "TodoForm",
  setup() {
    const store = useStore()
    const title = ref('')
    const description = ref('')
    const date = ref('')
    const textarea = ref(null)
    const priority = ref('default')
    const submitHandler = () => {
      const todo = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        date: date.value,
        status: 'active',
        priority: priority.value
      }
      store.dispatch('todos/createTodo', todo)
      title.value = ''
      description.value = ''
      date.value = ''
    }
    const priorityOptions = computed(() => store.getters['filters/priorityOptions'])
    const resize = () => {
      textarea.value.style.height = 'auto'
      textarea.value.style.height = textarea.value.scrollHeight + 'px'
    }
    return {
      title,
      description,
      submitHandler,
      textarea,
      resize,
      date,
      priority,
      priorityOptions
    }
  }
}
</script>

<style lang="scss">
.form {
  width: 600px;
  legend {
    margin: 0 0 20px;
    padding: 0;
    font-weight: 500;
  }
}
.form-control {
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .form-input {
    width: 100%;
    border-radius: 8px;
    padding: 8px;
    outline: none;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  textarea {
    resize: none;
    width: 100%;
    font-family: 'Roboto', 'Arial', sans-serif;
    overflow: hidden;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
.form-btn {
  display: block;
  margin-right: 0;
  margin-left: auto;
  width: 140px;
  height: 30px;
  border-radius: 4px;
  background-color: dodgerblue;
  color: #fff;
  transition: 0.3s;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>