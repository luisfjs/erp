import consts from '../../consts'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(consts.USER_KEY)),
    validToken: false,
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_VALIDATED':
            if(action.payload) {
                return { ...state, validToken: true, isLoading: false }
            } else {
                localStorage.removeItem(consts.USER_KEY)
                return { ...state, validToken: false, user: null, isLoading: false }
            }
        case 'USER_FETCHED':
            localStorage.setItem(consts.USER_KEY, JSON.stringify(action.payload))
            return { ...state, user: action.payload, validToken: true, isLoading: false }
        case 'IS_LOADING':
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}