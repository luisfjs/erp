import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'

import formReducer from '../components/form/formReducer'
import tableReducer from '../components/table/tableReducer'
import authReducer from '../components/auth/authReducer'

import dataTableNetReducer from '../components/datatables/dataTableNetReducer'

const rootReducer = combineReducers({
    form: reduxFormReducer,
    formReducer: formReducer,
    table: tableReducer,
    toastr: toastrReducer,
    auth: authReducer,
    dataTableNet: dataTableNetReducer
})

export default rootReducer