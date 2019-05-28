import React from 'react'

import If from './If'

export default props =>
    <button className={`btn ${props.color}`} type={props.type}>
        <If test={props.isLoading}>
            <i className="fa fa-circle-o-notch fa-spin"></i>{props.label}
        </If>
        <If test={!props.isLoading && props.icon}>
            {props.label}
            <i className={props.faIcon}>{props.icon}</i>
        </If>
    </button>