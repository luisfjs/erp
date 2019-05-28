import React from 'react';
import {Switch, Route} from 'react-router-dom'


import Tabela from '../components/table/Tabela'
import Form from '../components/form/Form'

export default props =>
    <main className="container-fluid d-flex flex-column side-nav-padding" >
        <Switch>
            <Route exact path='/*//' component={Tabela} />
            <Route path='/*/cadastrar' component={Form} />
            <Route path='/*/*/:id' component={Form} />
        </Switch>
    </main>