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
                {text: 'Высокий', type: '3'},
                {text: 'Обычный', type: '2'},
                {text: 'Низкий', type: '1'}
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