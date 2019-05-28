const INITIAL_STATE = {edit: false, formInputs: [], formData: {}, isLoading: false}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INPUT_CONFIG_FETCHED':
            return {...state, formInputs: action.payload, isLoading: false}
        case 'UPDATE_FORM_CALLED':
            return {...state, isLoading: false, edit: true}
        case 'IS_LOADING':
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}