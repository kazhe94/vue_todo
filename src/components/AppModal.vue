<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3 class="modal__title">{{title}}</h3>
    <div class="modal__buttons">
      <button class="modal__btn" @click="$emit('save')">Сохранить и перейти</button>
      <button class="modal__btn" @click="$emit('confirm')">Да</button>
      <button class="modal__btn modal__btn--red" @click="$emit('reject')">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  emits: ['close', 'reject', 'confirm', 'save'],
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss">
  .modal {
    &__title {
      text-align: center;
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
    }
    &__btn {
      min-width: 50px;
      border-radius: 4px;
      padding: 5px;
      background-color: green;
      color: #ffffff;
      &--red {
        background-color: red;
      }
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>