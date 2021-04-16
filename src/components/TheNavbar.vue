<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="navbar-title">Todos</h1>
      <ul class="nav-list">
        <li class="nav-list__item">
          <router-link to="/" exact>Создать</router-link>
        </li>
        <li class="nav-list__item">
          <router-link to="/list">Список задач</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar"
}
</script>

<style lang="scss">
  .navbar {
    padding: 20px 0;
    background-color: dodgerblue;
    color: #fff;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .nav-list {
    display: flex;
    &__item {
      transition: 0.3s;
      &:hover {
        color: #000;
      }
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>