import './ContentForm.css'

import React, {Component} from 'react'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'

// import {create} from './form/formActions'
import Form from '../components/form/Form'

class ContentForm extends Component {

    render(){
        return (
            <React.Fragment>
                <Form />
            </React.Fragment>
        )
    }
}

// const mapDispatchToProps = dispatch => bindActionCreators({create}, dispatch)
// export default connect(null, mapDispatchToProps)(ContentForm)

export default ContentForm
