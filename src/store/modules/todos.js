export default {
    namespaced: true,
    state() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    mutations: {
        addTodo(state, payload) {
            state.todos.push(payload)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo(state, id) {
            state.todos = state.todos.filter(el => el.id !== id)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateStatus(state, id) {
            const current = state.todos.find(el => el.id === id)
            current.status === 'completed' ? current.status = 'active' : current.status = 'completed'
            localStorage.setItem('todos', JSON.stringify(state.todos))

        }
    },
    actions: {
      createTodo({commit}, payload) {
          commit('addTodo', payload)
      },
      deleteTodo({commit}, id) {
          commit('removeTodo', id)
      },
        updateTodoStatus({commit}, id) {
          commit('updateStatus', id)
        }
    },
    getters: {
        todos(state) {
            return state.todos
        },
        activeTodos(_,getters) {
            return getters.todos.filter(item => item.status === 'active')
        },
        completedTodos(_,getters) {
            return getters.todos.filter(item => item.status === 'completed')
        }
    }
}