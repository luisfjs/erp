import { toastr } from 'react-redux-toastr'
import consts from '../../consts'
import api from '../../main/api'

export const login = (values) =>{
    return submit(values, `${consts.LOGIN_URL}`)
}

export const logout = () => {
    return {type: 'TOKEN_VALIDATED', payload: false}
}

export const validateToken = (token) => {
    return dispatch => {
        if(token) {
            api.get(`${consts.CHECK_TOKEN_URL}?token=${token}`)
                .then(resp => {
                    dispatch({type: 'TOKEN_VALIDATED', payload: resp.data.active})
                })
                .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
        } else {
            dispatch({type: 'TOKEN_VALIDATED', payload: false})
        }
    }
}

export const submit = (values, url) => {
    return dispatch => {
        api.post(url, JSON.stringify(values))
        .then(resp => {
            dispatch([
                {type: 'USER_FETCHED', payload: resp.data}
            ])
        })
        .catch(e => {
            toastr.error('Erro', "Erro")
        })
    }
}

export const setLoading = () => ({type: 'IS_LOADING', payload: true})