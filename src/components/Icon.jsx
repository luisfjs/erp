import React from 'react'

export default props =>
    <React.Fragment>
        {props.type === 'materializecss' ? <i className={`${props.size} material-icons`}>{props.icon}</i> : <i className={props.icon}></i>}
    </React.Fragment>
