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
                id: state.todos.length + 1
            })
            console.log(state.todos)
        }
    },
    getters: {
        todos(state) {
            console.log(state.todos)
            return state.todos
        }
    }
}