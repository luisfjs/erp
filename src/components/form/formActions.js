import consts from '../../consts'
import api from "../../main/api";
import {reset as resetForm,initialize} from 'redux-form'


export const initializeForm = (url) =>{
    return [
        getInputConfig(url),
        {type: 'INITIALIZE_FORM'}
    ]
}

export const getInputConfig = (url) => {
    return (dispatch) => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${url}getInputList`)
            .then(request => dispatch({type: 'INPUT_CONFIG_FETCHED', payload: request.data}))
    }
}

export const create = (values, endpoint) => {
    return [submit(values, endpoint), initializeForm(endpoint)]
}

export const updateForm = (url) => {
    return (dispatch) => {
        api.get(`${consts.BASE_URL}/${consts.API_URL}${url}`)
            .then(request => dispatch(initialize('cadastrar', (request.data))))
            .then(request => dispatch({type: 'UPDATE_FORM_CALLED'}))
    }
}

export const setLoading = () => ({type: 'IS_LOADING', payload: true})

const submit = (values, endpoint) => {
    const method = `${values.id ? 'put' : 'post'}`
    const retorno = api[method](`${consts.BASE_URL}/${consts.API_URL}${endpoint}`, values)

    return ({type: 'RESOURCE_CREATED', payload: retorno.data})
}

export const upload = (values, endpoint) => {
    const retorno = api.post(`${consts.BASE_URL}/${consts.API_URL}${endpoint}upload`, values)

    return [({type: 'RESOURCE_CREATED', payload: retorno.data}), initializeForm]
}