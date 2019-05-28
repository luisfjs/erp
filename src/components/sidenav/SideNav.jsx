import './SideNav.css'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import M from 'materialize-css'

import image from '../../assets/img/user.png'
import {getTableConfig, setTitle} from '../table/tableActions';
import {getInputConfig} from '../form/formActions';
import {logout} from '../auth/authActions'
import Icon from '../Icon'

import api from '../../main/api'
import consts from '../../consts'

class SideNav extends Component{

    constructor(props){
        super(props)
        this.state = {
            url: '/clientes/usuario/',
            sideNav:[],
            fotourl: image,
            login: 'Login',
            name: 'Nome'
        }

        if(this.state.url.endsWith('cadastrar')) {
            this.getSideNavItens(this.state.url.replace('cadastrar', ''))
        }else {
            this.getSideNavItens(this.state.url)
        }
    }

    getSideNavItens = async (url) => {
        const result = await api.get(`${consts.BASE_URL}/${consts.API_URL}${url}getSidenav`)
        this.setState({sideNav: result.data})
        this.getUserInf(url)
    }

    getUserInf = async (url) => {
        const result = await api.get(`${consts.BASE_URL}/${consts.API_URL}${url}user`)

        const {name, login, fotourl} = result.data.usuario
        this.setState({...this.state, name, login, fotourl})
    }

    handleChangeUrl = event =>{
        const url = event.target.closest("a").getAttribute('href')
        const title = event.target.closest("a").querySelector('span').innerText
        const icon = event.target.closest("a").querySelector('i').getAttribute('class')
        console.log(icon)
        if(url.endsWith('cadastrar')){
            let newUrl = url.replace('cadastrar', '')
            this.props.getInputConfig(newUrl)
        }else {
            this.props.setTitle(title, icon)
            this.props.getTableConfig(url)
        }
        this.setState({...this.state, url})

    }

    renderNavItens = () => {
        return this.state.sideNav.map((navItem, index) => {
            return(
                <li key={index}><Link to={navItem.url} onClick={this.handleChangeUrl}><Icon icon={`${navItem.icon} blue-grey-text text-darken-2`} /><span>{navItem.texto}</span></Link></li>
            )
        })
    }

    render() {
        var options = {
            menuWidth: 300,
            edge: 'left'
        }
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, options);
        });

        return (
            <div className='materializecss'>
                <ul id="slide-out" className="sidenav sidenav-fixed d-flex flex-column">
                    <div className="side-nav-head">
                        <li className="blue-grey darken-4">
                            <div className="user-view">
                                <a href="/"><img className="circle" alt='Usuario' src={this.state.fotourl}/></a>
                                <a href="/"><span className="white-text name">{this.state.name}</span></a>
                                <a href="/"><span className="white-text name">{this.state.login}</span></a>
                            </div>
                        </li>
                        <div className="divider grey darken-1"></div>
                        <li><Link to="/clientes/usuario/" onClick={this.handleChangeUrl} className="blue-grey lighten-4 light-blue-text text-accent-4"><Icon type='materializecss' size='white-text' icon='home' />Home</Link></li>
                        <li>
                            <div className="divider blue-grey lighten-3"></div>
                        </li>
                    </div>
                    <div className="side-nav-body white h-auto">
                        {this.renderNavItens()}
                    </div>
                    <div className="side-nav-footer mt-auto bd-highlight">
                        <li className="footer-nav-divider">
                            <div className="divider blue-grey lighten-3"></div>
                        </li>
                        <li className="footer-nav blue-grey lighten-4">
                            <a href="/logout" onClick={this.props.logout} className="waves-teal">
                                <i className="material-icons red-text text-darken-1">power_settings_new</i>Sair
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getInputConfig, getTableConfig, logout, setTitle }, dispatch)
export default connect(null, mapDispatchToProps)(SideNav)