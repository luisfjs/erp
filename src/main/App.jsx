import './App.css'

import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import NavBar from '../components/NavBar'
import SideNav from '../components/sidenav/SideNav'
import Footer from '../components/Footer'
import Routes from './Routes'

export default props =>
    <BrowserRouter>
        <React.Fragment>
            <NavBar/>
            <SideNav/>
            <Routes />
            <Footer/>
        </React.Fragment>
    </BrowserRouter>
