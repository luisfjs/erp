import './NavBar.css'

import React from 'react'

import NavItem from './NavItem'
import If from "./If";
import consts from "../consts";

export default props => {
    const user = JSON.parse(localStorage.getItem(consts.USER_KEY))
    return(
        <div className='materializecss'>
            <nav className={`blue-grey lighten-5 ${user ? 'side-nav-padding' : ''}`}>
                <div className="nav-wrapper">
                    <a href="/" data-target="slide-out" className="sidenav-trigger show-on-large">
                        <i className="material-icons">menu</i>
                    </a>
                    <div className="brand-logo"></div>
                    <If test={user}>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <NavItem to='/cliente/usuario' color='grey-text text-darken-4' label='Clientes'/>
                            <NavItem to='/core/user' color='grey-text text-darken-4' label='Core'/>
                        </ul>
                    </If>
                </div>
            </nav>
        </div>
    )
}