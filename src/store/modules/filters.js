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
            ],
            priorityOptions: [
                {text: 'Высокий', type: 'high'},
                {text: 'Обычный', type: 'default'},
                {text: 'Низкий', type: 'low'}
            ],
            sort: {
                type: 'date',
                text: 'По дате создания'
            },
            filter: {
                type: 'all',
                text: 'Все задачи'
            }
        }
    },
    mutations: {
        setFilter(state, type) {
            const newFilter = state.statusOptions.find(el => el.type === type)
            state.filter = newFilter
        },
        setSort(state, type) {
            const newSort = state.sortOptions.find(el => el.type === type)
            state.sort = newSort
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
        },
        sort(state) {
            return state.sort
        },
        filter(state) {
            return state.filter
        }
    }
}