import 'jquery/dist/jquery.min'
import 'materialize-css/dist/js/materialize.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/materialize.css'
import 'material-design-lite/material.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './App'
import FormLogin from '../components/auth/FormLogin'
import { validateToken } from '../components/auth/authActions'

class AuthOrApp extends Component {
    componentWillMount() {
        if(this.props.auth.user) {
            this.props.validateToken(this.props.auth.user.access_token)
        }
    }

    render() {

        /*axios.defaults.headers.common['Authorization'] = 'Bearer 522623e8-3dc2-4d94-859c-3843a7d46f60'
        return <App>{this.props.children}</App>*/

        const { user, validToken } = this.props.auth
        if(user && validToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
            return <App>{this.props.children}</App>
        } else if(!user && !validToken) {
            return <FormLogin />
        } else {
            return false
        }
    }
}
const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)