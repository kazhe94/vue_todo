export default {
    namespaced: true,
    state() {
        return {
            statusOptions: [
                {type: 'all', text: 'Все задачи'},
                {type: 'active', text: 'Активные'},
                {type: 'completed', text: 'Завершённые'}
            ],
            sortOptions: [
                {text: 'По алфавиту', type: 'name'},
                {text: 'По дате создания', type: 'date'}
            ]
        }
    },
    getters: {
        statusOptions(state) {
            return state.statusOptions
        },
        sortOptions(state) {
            return state.sortOptions
        }
    }
}