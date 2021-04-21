<template>
  <app-page title="Список задач">
    <div class="filters">
      <app-filter
          :filter="sort"
          @setFilter="setSort"
          :options="sortOptions"
          :open="sortOpened"
          @openFilter="sortOpened = !sortOpened"
          @close="sortOpened = false"
      >
        <template #reverse>
          <button
              @click="reverse = !reverse"
              class="reverse-btn">
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve">
    <g>
      <g>
        <path d="M362.668,128.004H26.608c-12.382,0-23.757,8.346-26.112,20.497c-3.174,16.341,9.318,30.703,25.105,30.703h337.067    c2.355,0,4.267-1.911,4.267-4.267v-42.667C366.935,129.916,365.023,128.004,362.668,128.004z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M508.98,147.085L398.047,53.218c-2.534-2.142-6.084-2.628-9.105-1.229c-3.012,1.408-4.941,4.42-4.941,7.748v187.733    c0,3.328,1.929,6.34,4.941,7.74c1.152,0.538,2.372,0.794,3.593,0.794c1.98,0,3.942-0.691,5.513-2.014l110.933-93.867    c1.92-1.63,3.021-4.011,3.021-6.519S510.9,148.715,508.98,147.085z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M123.06,256.798c-3.021-1.399-6.571-0.913-9.105,1.229L3.022,351.893c-1.92,1.621-3.021,4.002-3.021,6.511    s1.101,4.89,3.021,6.519l110.933,93.867c1.57,1.323,3.533,2.014,5.513,2.014c1.22,0,2.441-0.256,3.593-0.794    c3.012-1.399,4.941-4.412,4.941-7.74V264.538C128.001,261.21,126.073,258.197,123.06,256.798z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M511.506,353.301c-2.364-12.151-13.739-20.497-26.112-20.497h-336.06c-2.355,0-4.267,1.911-4.267,4.267v42.667    c0,2.355,1.911,4.267,4.267,4.267h337.067C502.188,384.004,514.681,369.643,511.506,353.301z"/>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
          </span>
          </button>
        </template>
      </app-filter>
      <app-filter
          :filter="filter"
          @setFilter="setFilter"
          :options="filterOptions"
          :open="filterOpened"
          @openFilter="filterOpened = !filterOpened"
          @close="filterOpened = false"
      >
        <template #count>
          <span>{{ `(${todos.length})` }}</span>
        </template>
      </app-filter>
    </div>
    <ul class="todo-table" v-if="todos.length">
        <li>
          <h5>#</h5>
          <h5>Название</h5>
          <h5>Дедлайн</h5>
          <h5>Приоритет</h5>
          <h5>Статус</h5>
          <h5>Действие</h5>
          <h5>Удалить</h5>
          <h5>Открыть</h5>
        </li>
        <todo-item
            v-for="(todo, idx) in todos"
            :todo="todo"
            :idx="idx+1"
            :key="todo.id"
        ></todo-item>
    </ul>
    <h3 v-else>Задач пока нет, добавьте <router-link class="todo-list__link" to="/">новую</router-link></h3>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
import TodoItem from "@/components/TodoItem";
import AppFilter from "@/components/AppFilter";

export default {
  name: "List",
  components: {
    AppPage,
    TodoItem,
    AppFilter
  },
  setup() {
    const store = useStore()
    const filterOpened = ref(false)
    const sortOpened = ref(false)
    const filter = computed(() => store.getters['filters/filter'])
    const sort = computed(() => store.getters['filters/sort'])
    const reverse = ref(false)
    const filterOptions = computed(() => store.getters['filters/statusOptions'])
    const sortOptions = computed(() => store.getters['filters/sortOptions'])
    const todos = computed(() => {
      const items = store.getters['todos/todos']
          .filter(item => {
            return filter.value.type !== 'all' ? item.status === filter.value.type : item
          })
          .sort((a, b) => {
            if(sort.value.type === 'name') {
              return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            }
            if(sort.value.type === 'date') {
              return a.id > b.id ? -1 : 1
            }
            if(sort.value.type === 'deadline') {
              return a.date > b.date ? 1 : -1
            }
            if(sort.value.type === 'priority') {
              return a.priority > b.priority ? -1 : 1
            }
            return
          })
      return reverse.value ? items.reverse() : items
    })

    const setFilter = (type) => {
      console.log(type)
      store.commit('filters/setFilter', type)
    }
    const setSort = (type) => {
      console.log(type)
      store.commit('filters/setSort', type)
    }

    return {
      todos,
      filter,
      sort,
      filterOptions,
      filterOpened,
      sortOptions,
      sortOpened,
      reverse,
      setFilter,
      setSort,
    }
  }
}
</script>

<style lang="scss">
  h3 {
    text-align: center;
  }
  .todo-list__link {
    color: dodgerblue;
    border-bottom: 1px solid transparent;
    transition: 0.3s;
    &:hover {
      border-color: dodgerblue;
    }
  }
  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    &:first-child {
      margin-left: 0;
      margin-right: auto;
    }
  }
  .reverse-btn {
    position: absolute;
    right: -30px;
    top: -6px;
    width: 24px;
    height: 24px;
    padding: 0;
    &:hover {
      background-color: #b9e7fc;
    }
    span {
      display: block;
      width: 18px;
      height: 18px;
      margin: 0 auto;
      transform: rotate(90deg);
    }
  }
  .todo-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    li {
      display: table-row;
    }
    h5 {
      display: table-cell;
      padding-bottom: 16px;
      text-align: center;
    }
    div {
      display: table-cell;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 20px 0;
      text-align: center;
    }
  }
</style>