import api from '../../main/api'
import consts from '../../consts'

export const getTableConfig = (url) => {
    return dispatch => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${url}getTableConfig`)
            .then(request => dispatch(fetchData(url, request.data)))
    }
}

export const getDataTable = (url, dataTable, tableConfig = {}) => {
    const table = {tableConfig, dataTable}
    return dispatch => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${url}listar?${dataTable}`)
            .then(request => dispatch({type: 'TABLE_FETCHED', payload: {...table, list: request.data}}))
    }
}

export const fetchData = (url, table = {}) => {
    return (dispatch, getState) => {
        const {tableConfig, dataTable: {order, start, length, draw, search}} = getState().table
        let params = `draw=${draw+1}`

        const configTable = Object.keys(table).length === 0 ? tableConfig : table
        let result = ''

        if(Object.keys(configTable.colunaBean).length > 1) {
            result = configTable.colunaBean.reduce((retorno, next, i) => {
                const index = i - 1
                return `${index === 0 ? '' : retorno}columns[${index}].data=${next.nome}&columns[${index}].name=&columns[${index}].searchable=${next.href ? 'false' : 'true'}&columns[${index}].orderable=true&columns[${index}].search.value=&columns[${index}].search.regex=false&`
            });
        }else{
            const coluna = configTable.colunaBean[0]
            result = `columns[0].data=${coluna.nome}&columns[0].name=&columns[0].searchable=${coluna.href ? 'false' : 'true'}&columns[0].orderable=true&columns[0].search.value=&columns[0].search.regex=false&`
        }

        result = `${params}&${result}order[0].column=${order.column}&order[0].dir=${order.dir}&start=${start}&length=${length}&search.value=${search}&search.regex=false`

        return dispatch(getDataTable(url, encodeURI(result), configTable))
    }
}

export const changePage = page => ({type: 'PAGE_CHANGED', payload: page})

export const changeRowsPerPage = length => ({type: 'LENGTH_CHANGED', payload: length})

export const requestSort = (order, endpoint) => ([{type: 'SORT_CHANGED', payload: order}, getTableConfig(endpoint)])

export const search = search => ({type: 'SEARCH_CHANGED', payload: search})

export const setLoading = () => ({type: 'IS_LOADING', payload: true})

export const setTitle = (title, icon) => ({type: 'TITLE_FETCHED', payload: {title, icon}})