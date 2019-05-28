import './InputForm.css'

import React from 'react'
import $ from 'jquery'
import M from 'materialize-css'
import 'materialize-autocomplete'

import {CheckboxGroup, Checkbox} from 'react-checkbox-group'
import {RadioGroup, Radio} from 'react-radio-group'
import {Field} from 'redux-form'

import api from '../main/api'

import If from './If'
import image from '../assets/img/user.png'
import consts from "../consts";


export const InputText = props => {
        return (
        <div className={`input-field ${props.inputConfig.size}`}>
            <input {...props.input} className={props.inputConfig.inputClass} readOnly={props.readOnly} id={props.input.name} type={props.inputConfig.type}/>
            <label className={`w-100 ${props.active ? 'active' : ''}`} htmlFor={props.input.name}>{props.inputConfig.placeholder}</label>
            {props.inputConfig.type === 'password' ?
                <i id="olho-show-password" className="material-icons password-show-button p-i"
                   onClick={(e) => click(e, props.input.name)} >visibility_off</i>
                : ''}
        </div>
    )
}

export const InputFile = props => {
        delete props.input.value

        const onchangeFileInput = (event) => {
            const idpreview = `${props.inputConfig.id !== null ? props.inputConfig.id : props.input.name}-file-foto-preview`
            const elPreview = document.getElementById(idpreview)
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    elPreview.setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(event.target.files[0]);
            }
            props.input.onChange(event.target.files[0])
            // props.input.value = event.target.files[0]
        }

        return(
            <div
            className={`input-field file-field ${props.inputConfig.size} ${props.inputConfig.userFoto ? 'profile-foto' : ''}`}>
            <If test={props.inputConfig.userFoto}>
                <div className="col s12">
                    <img alt=""
                         id={`${props.inputConfig.id !== null ? props.inputConfig.id : props.input.name}-file-foto-preview`}
                         src={image} className="col s4 offset-s4 responsive-img circle"/>
                </div>
            </If>
            <div className="btn">
                <span>{props.inputConfig.placeholder}</span>
                <input type="file" multiple={props.inputConfig.multiple} {...props.input} onChange={onchangeFileInput} />
            </div>
            <div className="file-path-wrapper">
                <Field name={props.inputConfig.fileName} component='input' className="file-path validate" type="text" placeholder={props.inputConfig.placeholder}/>
            </div>
        </div>
        )
}

export const InputHidden = props =>
    <input {...props.input} value={props.inputConfig.value} type='hidden' />

class RadioCheck extends React.Component{
    componentDidMount(){
        const el = document.getElementsByName(`radiocheckboxGroup-${this.props.input.name}`)
        const values = this.setChecked(el)
        this.handleCheckboxListChange(values, this.props.input)
    }

    setChecked = nodeList => {
        const valuesArr = []
        Array.prototype.map.call(nodeList, (node) => {
            const values = this.props.inputConfig.checked
            if(values.includes(node.value)){
                node.checked = true
                valuesArr.push(node.value)
            }
        })
        return valuesArr
    }

    showHide = (event) => {
        const classNameElement = `.${event.target.value}`
        const elementToHide = document.querySelector(classNameElement)

        elementToHide.hidden = event.target.checked
    }

    handleCheckboxListChange = (values, input) => {
        const val = typeof values === 'string' ? values : values.join(',')
        input.onChange(val)
    }

    renderCheckBox = () => {
        const {input, input:{value}, inputConfig:{radioCheckValuesBeans}} = this.props
        return (
        <CheckboxGroup  className='checkboxGroup'
                        checkboxDepth={2}
                        name={input.name}
                        onChange={(values) => this.handleCheckboxListChange(values, input)}>
                        {radioCheckValuesBeans.map(item => (
                            <label key={item.id}>
                                <Checkbox value={item.valor} checked={item.valor === value} />
                                <span>{item.texto}</span>
                            </label>
                        ))}
        </CheckboxGroup>
    )}

    renderRadio = () => {
        const {input, input:{value}, inputConfig:{radioCheckValuesBeans}} = this.props
        return (
            <RadioGroup className='radioGroup'
                        name={input.name}
                        onChange={(values) => this.handleCheckboxListChange(values, input)}
                        selectedValue={value}>
                        {radioCheckValuesBeans.map(item => (
                            <label key={item.id}>
                                <Radio value={item.valor} />
                                <span>{item.texto}</span>
                            </label>
                        ))}
            </RadioGroup>
        )}

    render() {
        return (
            <div className={`radiocheck-container ${this.props.inputConfig.size}`}>
                {this.props.inputConfig.type === 'checkbox' ? this.renderCheckBox() : this.renderRadio()}
            </div>
        )
    }
}

export const DatePicker = props => {
    const data = new Date();
    const options = {
        i18n: {
            today: 'Hoje',
            clear: 'Limpar',
            done: 'Ok',
            nextMonth: 'Próximo mês',
            previousMonth: 'Mês anterior',
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            weekdays: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        },
        selectMonths : true,
        selectYears : 70,
        min : new Date(data.getFullYear() - 70, 0, 1),
        max : new Date(data.getFullYear() + 0, 11, 31),
        defaultDate: new Date(),
        setDefaultDate: true,
        format: 'dd/mm/yyyy',
        onClose: function() {
            this.el.value = ("0" + (this.date.getDate())).slice(-2)+"/"+("0" + (this.date.getMonth() + 1)).slice(-2)+"/"+this.date.getFullYear();
        }
    }

    const elem = document.getElementById(props.inputConfig.name)
    M.Datepicker.init(elem, options);

    return (
        <div className={`input-field ${props.inputConfig.size}`}>
            <input {...props.input} type="text" className="datepicker" />
        </div>
    )
}

export const TimePicker = props => {
    const options = {
        i18n: {
            clear: 'Limpar',
            cancel: 'Cancelar',
            done: 'Ok',
        },
        defaultTime: 'now',
        fromnow: 0,
        twelveHour: false
    };
    var elem = document.getElementById(props.input.name);
    M.Timepicker.init(elem, options);
    return (
        <div className={`input-field ${props.inputConfig.size}`}>
            <input {...props.input} type="text" className="timepicker" />
        </div>
    )
}

class SelectInput extends React.Component {
    componentDidMount(){
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }

    renderOption = () => {
        const list = this.props.inputConfig.estatico ? this.props.inputConfig.radioCheckValuesBeans : this.props.inputConfig.selectList
        const options = list.map(item => {
            if (this.props.inputConfig.estatico) {
                return <option key={item.valor} value={item.valor} >{item.texto}</option>
            } else {
                return <option key={item.id} value={item.id} >{item[this.props.inputConfig.text]}</option>
            }
        })
        return options
    }

    /*renderOptionSelect = () => {
        const list = this.props.inputConfig.estatico ? this.props.inputConfig.radioCheckValuesBeans : this.props.inputConfig.selectList
        const options = list.map(item => {
            if (this.props.inputConfig.estatico) {
                return {'label': item.texto, 'value': item.valor}
            } else {
                return {'label': item[this.props.inputConfig.text], 'value': item.id}
            }
        })
        return options
    }*/

    onChange = (e) => {
        const val = this.props.input.value || [];
        val.push({id: e.target.value})
        this.props.input.onChange(val)
    }

    render() {
        const {input, input:{value}, inputConfig, inputConfig:{estatico}} = this.props
        const valor = estatico ? value.valor : value.id

        return (
            <div className={`input-field ${inputConfig.size}`}>
                <select {...input}  defaultValue={valor}
                                    multiple={inputConfig.multiple}
                                    value={inputConfig.multiple ? [] : ''}
                                    onChange={(value) => inputConfig.multiple ? this.onChange(value) : input.onChange(value)}>

                    <option disabled="disabled" value='' hidden="hidden">{`-- ${inputConfig.defaultSelect} --`}</option>
                    {this.renderOption()}
                </select>
                <label htmlFor={this.props.input.name}>{this.props.inputConfig.defaultSelect}</label>
            </div>
        )
    }
}

class AutoCompleteInput  extends React.Component {
    componentDidMount() {
        const options = {
            limit: 10,
            multiple: {
                enable: this.props.inputConfig.multiple,
                maxSize: 100
            },
            dropdown: {
                el: `#dropdown-${this.props.inputConfig.id}`,
                noItem : "Nenhum item encontrado!"
            },
            hidden: {
                enable: true,
                el: `#${this.props.input.name}`,
                inputName: this.props.input.name,
                required: true
            },
            getData: function (value, callback) {
                let url = `${this.props.inputConfig.url}/getAutoCompleteFiltered/`
                const filter = value === "" ? "*" : value.toLowerCase()
                url = `${url}${this.props.inputConfig.text}/${filter}`
                api.get(`${consts.BASE_URL}${url}`).then(resp => callback(value, resp.data))
            },
            onSelect: function (value) {
                const elem = document.getElementById(this.props.input.name)
                elem.dispatchEvent(new Event('change'))
            }
        }
        $(`#${this.props.inputConfig.id}`).materialize_autocomplete(options)
    }

    render() {
        return (
            <div className={`input-field ${this.props.inputConfig.size}`}>
                <div className="autocomplete" id="multiple">
                    <div className="ac-input select-wrapper">
                        <input id={`input-${this.props.inputConfig.id}`} type="text"
                               className={this.props.inputConfig.selectClass}
                               attr={`data-activates='dropdown-'${this.props.inputConfig.id}`} data-beloworigin="true"
                               autoComplete="off"/>
                        <svg className="caret" height="24" viewBox="0 0 24 24" width="24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10l5 5 5-5z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                    </div>
                    <ul id={`dropdown-${this.props.inputConfig.id}`} className="ac-dropdown dropdown-content"></ul>
                    <input type="hidden" {...this.props.input} />
                </div>
                <label className="active" htmlFor={this.props.inputConfig.id}>{this.props.inputConfig.placeholder}</label>
            </div>
        )
    }
}

export const Switch = props =>
    <div className={`input-field ${props.inputConfig.size}`}>
		<span>
			<label htmlFor={props.input.name}>{props.inputConfig.placeholder}</label>
		</span>
        <div className="switch right">
            <label>
                Não
                <input type="checkbox" {...props.input} />
                <span className="lever"></span>
                Sim
            </label>
        </div>
    </div>

export const TextArea = props =>
    <div className={`input-field ${props.inputConfig.size}`}>
        <textarea {...props.input} className={`materialize-textarea ${props.inputClass}`}></textarea>
        <label htmlFor={props.input.name}>{props.inputConfig.label}</label>
    </div>

export const Button = props =>
    <button className={`m-1 btn ${props.color}`} type={props.type} name="action">
        {props.label}
        <If test={props.icon}>
            <i className='material-icons right'>{props.icon}</i>
        </If>
    </button>

const click = (event, id) => {
    const attr = document.getElementById(id).getAttribute('type') === 'text' ? 'password' : 'text'
    const icon = event.target.innerHTML === 'visibility' ? 'visibility_off' : 'visibility'
    document.getElementById(id).setAttribute('type', attr)
    event.target.innerHTML = icon
}

export default {InputText, RadioCheck, SelectInput, Switch, TextArea, DatePicker, TimePicker, Button, InputFile, InputHidden, AutoCompleteInput}