import './Auth.css'

import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {login} from './authActions'
import Footer from "../Footer";
import NavBarNoLinks from "../NavBarNoLinks";
import InputForm from "../InputForm";

class Auth extends Component {
    state = {
        password: '',
        showPassword: false
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

    onSubmit = (values) => {
        values.grant_type= 'password'
        values.client_id = 'lsena'
        values.client_secret = 'mudar@12'
        values.scope = 'read write'
        this.props.login(values)
    }

    render = () => {
        const { handleSubmit } = this.props
        return (
            <React.Fragment>
                <main>
                    <NavBarNoLinks />
                    <div className="row justify-content-center w-100 mt-5 mt-5 ml-auto mr-auto">
                        <div className="bg-white col-sm-10 col-md-6 shadow p-5 rounded">
                            <h2 className="center-align grey-text text-darken-2 title-page">Login</h2>
                            <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
                                <div className="row">
                                    <Field name='username' className='col-12 react-input-ui' margin="normal" label='Usuario' type='text' component={TextField}/>
                                    <FormControl className='col-12'>
                                        <InputLabel htmlFor="password">Senha</InputLabel>
                                        <Field className='react-input-ui' name='password'
                                               label='Senha'
                                               margin="dense"
                                               component={Input}
                                               type={this.state.showPassword ? 'text' : 'password'}
                                               value={this.state.password}
                                               onChange={this.handleChange('password')}
                                               endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.handleClickShowPassword}>
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }/>
                                    </FormControl>
                                    <div className='w-100 justify-content-end row mt-3'>
                                        <InputForm.Button label='Logar' type='submit' color='bg-primary' icon='send'/>
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

Auth = reduxForm({form: 'authForm'})(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)
