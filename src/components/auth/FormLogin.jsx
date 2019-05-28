import './Auth.css'

import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {login, setLoading} from './authActions'
import InputForm from '../InputForm';
import LoadingButton from '../LoadingButton'
import Footer from "../Footer";
import NavBar from "../NavBar";

class FormLogin extends Component {

    onSubmit = (values) => {
        this.props.setLoading()
        const val = {...values, grant_type: 'password', client_id: 'lsena', client_secret: 'mudar@12', scope: 'read write'}
        this.props.login(val)
    }

    render = () => {
        const { handleSubmit, isLoading } = this.props
        return (
            <React.Fragment>
                <main>
                    <NavBar />
                    <div className="row justify-content-center w-100 mt-5 mt-5 ml-auto mr-auto">
                        <div className="bg-white col-sm-10 col-md-6 shadow p-5 rounded">
                            <span className='materializecss'><h2 className="center-align grey-text text-darken-2 title-page">Login</h2></span>
                            <form className="form materializecss" onSubmit={handleSubmit(this.onSubmit)}>
                                <div className="row d-block">
                                    <Field name='username' inputConfig={{size: 'col s12', type:'text', placeholder: 'Usuario'}} component={InputForm.InputText} />
                                    <Field name='password' inputConfig={{size: 'col s12', type:'password', placeholder: 'Senha'}} component={InputForm.InputText} />
                                    <div className='input-field col s12'>
                                        <LoadingButton isLoading={isLoading} label='Logar' type='submit' color='grey darken-2 waves-effect waves-light' faIcon='material-icons right' icon='send'/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer/>
            </React.Fragment>
        )
    }
}

FormLogin = reduxForm({form: 'authForm'})(FormLogin)
const mapDispatchToProps = dispatch => bindActionCreators({ login, setLoading }, dispatch)
export default connect(null, mapDispatchToProps)(FormLogin)
