import './sidenav/SideNav.css'

import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
    <li>
        <Link to={props.to} className={props.color}>
            {props.icon ? <i className='material-icons'>{props.icon}</i> : ''}
            {props.label}
        </Link>
    </li>