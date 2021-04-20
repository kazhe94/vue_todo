export default {
    namespaced: true,
    state() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    mutations: {
        addTodo(state, payload) {
            const status = new Date(payload.date).toLocaleDateString() < new Date().toLocaleDateString() ? 'expired' : 'active'
            state.todos.push({
                ...payload,
                status: status
            })
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo(state, id) {
            state.todos = state.todos.filter(el => el.id !== id)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateStatus(state, id) {
            const idx = state.todos.findIndex(el => el.id === id)
            state.todos[idx].status = state.todos[idx].status === 'completed' ? 'active' : 'completed'
            console.log(state.todos[idx])
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateTodo(state, payload) {
            const idx = state.todos.findIndex(item => item.id === payload.id)
            state.todos[idx] = payload
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
        },
        updateTodo({commit}, payload) {
            commit('updateTodo', payload)
        }
    },
    getters: {
        todos(state) {
            return state.todos
        },
        todo: (state) => (id) => {
            return state.todos.find(item => item.id === id)
        }
    }
}