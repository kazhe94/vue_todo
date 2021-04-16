<template>
  <form class="form" @submit.prevent="submitHandler">
    <legend>Заполните поля для добавления задачи</legend>
    <div class="form-control">
      <label for="title">Название</label>
      <input
          class="form-input"
          type="text" id="title"
          placeholder="Введите название задачи"
          v-model="title"
      >
    </div>
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
          class="form-input"
          id="description"
          placeholder="Введите описание задачи"
          v-model="description"
      />
    </div>
    <button class="submit-btn" type="submit">Добавить</button>
  </form>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "TodoForm",
  setup() {
    const store = useStore()
    const title = ref('')
    const description = ref('')
    const submitHandler = () => {
      const todo = {
        title: title.value,
        description: description.value
      }
      store.commit('todos/addTodo', todo)
      title.value = ''
      description.value = ''
    }
    return {
      title,
      description,
      submitHandler
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
    border-radius: 8px;
    padding: 8px;
    outline: none;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  input {
    width: 100%;
  }
  textarea {
    resize: none;
    width: 100%;
    font-family: 'Roboto', 'Arial', sans-serif;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
.submit-btn {
  display: block;
  margin-right: 0;
  margin-left: auto;
  width: 140px;
  height: 30px;
  border-radius: 4px;
  background-color: dodgerblue;
  color: #fff;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
</style>