const INITIAL_STATE = { list: {},
                        title: '',
                        icon: '',
                        isLoading: false,
                        tableConfig:{},
                        dataTable: {
                            draw: 0,
                            order: {dir: 'asc', column: 0},
                            start:0,
                            length: 5,
                            recordsFiltered: 0,
                            recordsTotal: 0,
                            search: '',
                            page: 0
                        }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TABLE_FETCHED':
            return {...state,
                    list: action.payload.list,
                    isLoading: false,
                    tableConfig: action.payload.tableConfig,
                    dataTable: {
                        ...state.dataTable,
                        recordsFiltered: action.payload.list.recordsFiltered,
                        recordsTotal: action.payload.list.recordsTotal
                }
            }
        case 'PAGE_CHANGED':
            return {...state, isLoading: false, dataTable: {...state.dataTable, start: state.dataTable.length * action.payload, page: action.payload}}
        case 'LENGTH_CHANGED':
            return {...state, isLoading: false, dataTable: {...state.dataTable, length: action.payload}}
        case 'SORT_CHANGED':
            return {...state, isLoading: false, dataTable: {...state.dataTable, order: action.payload}}
        case 'SEARCH_CHANGED':
            return {...state, isLoading: false, dataTable: {...state.dataTable, search: action.payload}}
        case 'IS_LOADING':
            return {...state, isLoading: action.payload}
        case 'TITLE_FETCHED':
            return {...state, title: action.payload.title, icon: action.payload.icon}
        default:
            return state
    }
}