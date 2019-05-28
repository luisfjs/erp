import './Footer.css'

import React from 'react'
import consts from "../consts";
export default props => {
    const user = JSON.parse(localStorage.getItem(consts.USER_KEY))
    return(
    <div className='materializecss'>
        <footer className={`page-footer blue-grey lighten-5 ${user ? 'side-nav-padding' : ''}`}>
            <div className="footer-copyright">
                <div className="center-align container grey-text text-darken-4">
                    <strong>Copyright© {new Date().getFullYear()} - Lsena</strong> Todos os Direitos Reservados
                </div>
            </div>
        </footer>
    </div>
    )
}