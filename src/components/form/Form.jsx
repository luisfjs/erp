import './Form.css'

import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import InputForm from "../InputForm";
import {getInputConfig, create, updateForm, setLoading, initializeForm, upload} from './formActions'
import inputItens from "./inputItens";

class Form extends Component {

    componentWillMount(){
        this.init()
    }

    componentDidUpdate(){
        const url = this.props.location.pathname
        if(this.props.match.params.id){
            this.props.getInputConfig(url.replace(this.props.match.params.id, ''))
            this.props.updateForm(url)
        }
    }

    init = () => {
        const url = this.props.location.pathname
        if(url.endsWith('cadastrar')) {
            this.props.initializeForm(url.replace('cadastrar', ''))
        }else if(this.props.match.params.id){
            this.props.getInputConfig(url.replace(this.props.match.params.id, ''))
            this.props.updateForm(url)
        }
    }

    renderForm = () => {
        const formInputs = this.props.formReducer.formInputs || []

        return formInputs.map((input, index) => {
            const name = (input.estatico !== undefined) ?  (input.estatico ? input.name : (input.multiple ? input.name : `${input.name}.id`)) : input.name
            const ComponentField = inputItens[input.domselector]
            return <Field key={index} name={name} component={ComponentField} inputConfig={input} active={this.props.formReducer.edit} />
        })
    }

    onSubmit = (values) => {
        const formInputs = this.props.formReducer.formInputs || []
        const inputFile = formInputs.find(input => input.domselector === 'inputfile')
        if(inputFile){
            const data = new FormData();
            Object.keys(values).forEach((value) => {
                if(value !== inputFile.name)
                    data.append(value, values[value])

                if(typeof values[value] === 'object' && value !== inputFile.name){
                    values[value].forEach((val, index) => {
                        data.append(`${value}[${index}].id`, val.id)
                    })
                }
            })
            data.append(inputFile.name, values[inputFile.name][0])
            this.props.create(data, this.props.location.pathname.replace('cadastrar', ''))
        }else{
            this.props.create(values, this.props.location.pathname.replace('cadastrar', ''))
        }
        this.init()
    }

    render = () =>{
        const {handleSubmit, formReducer, title} = this.props
        return(
            <React.Fragment>
                <span className='materializecss'><h4 className="center-align grey-text text-darken-2 title-page col-12 mt-5" >{`${formReducer.edit ? 'Atualizar' : 'Cadastrar'} ${title}`}</h4></span>
                <section className="row justify-content-center align-items-center">
                    <form onSubmit={handleSubmit(this.onSubmit)} className='col-8 form shadow p-3 mb-5 bg-white rounded materializecss'>
                        <Field name='id' component='input' type='hidden' />
                        <div className="row d-block">
                        {this.renderForm()}
                        </div>
                        <div className='w-100 justify-content-end row'>
                            <InputForm.Button label='Cadastrar' type='submit' color='bg-primary'/>
                            <InputForm.Button label='Cancelar' type='button' color='bg-secondary' onClick={this.init}/>
                        </div>
                    </form>
                </section>
            </React.Fragment>
        )
    }
}
Form = reduxForm({form: 'cadastrar'})(Form)
const mapStateToProps = state => ({formReducer: state.formReducer, title: state.table.title, icon: state.table.icon})
const mapDispatchToProps = dispatch => bindActionCreators({getInputConfig, create, updateForm, setLoading, initializeForm, upload}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form)