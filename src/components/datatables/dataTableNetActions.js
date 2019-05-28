import api from '../../main/api'
import consts from '../../consts'


export const create = (values) => {
    console.log(values)
}

export const getTableConfig = (endpoint) => {
    return dispatch => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${endpoint}getTableConfig`)
            .then(request => dispatch({type: 'CONFIG_FETCHED', payload: request.data}))
    }
}

export const getDataTable = (url) => {
    return dispatch => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${url}listar`)
            .then(request => dispatch({type: 'LIST_FETCHED', payload: request.data}))
    }
}

/*
export const getTableConfig = async (endpoint) => {
    const retorno = await authApi.get(`/${endpoint}/getTableConfig`)
    try{
        console.log(retorno)
        return ({
            type: 'CONFIG_FETCHED',
            payload: retorno.data
        })
    }catch (e) {
        console.log(e)
    }
}*/
