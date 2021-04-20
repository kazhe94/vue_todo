export default {
    namespaced: true,
    state() {
        return {
            statusOptions: [
                {type: 'all', text: 'Все задачи'},
                {type: 'active', text: 'Активные'},
                {type: 'completed', text: 'Завершённые'},
                {type: 'expired', text: 'Просроченные'}
            ],
            sortOptions: [
                {text: 'По алфавиту', type: 'name'},
                {text: 'По дате создания', type: 'date'},
                {text: 'По дате дедлайна', type: 'deadline'},
                {text: 'По приоритету', type: 'priority'}
            ],
            priorityOptions: [
                {text: 'Высокий', type: 'high'},
                {text: 'Обычный', type: 'default'},
                {text: 'Низкий', type: 'low'}
            ]
        }
    },
    getters: {
        statusOptions(state) {
            return state.statusOptions
        },
        sortOptions(state) {
            return state.sortOptions
        },
        priorityOptions(state) {
            return state.priorityOptions
        }
    }
}