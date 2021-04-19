import { createStore } from 'vuex'
import todos from './modules/todos.js'
import filters from './modules/filters.js'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos,
    filters
  }
})
