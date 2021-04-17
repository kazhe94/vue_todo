export default {
    namespaced: true,
    state() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    mutations: {
        addTodo(state, payload) {
            state.todos.push({
                ...payload,
                id: Date.now(),
                status: 'active'
            })
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo(state, id) {
            state.todos = state.todos.filter(el => el.id !== id)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateStatus(state, payload) {
            const current = state.todos.find(el => el.id === payload.id)
            current.status = payload.status
        }
    },
    getters: {
        todos(state) {
            return state.todos
        }
    }
}