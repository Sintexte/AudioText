import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter,Switch } from 'react-router-dom'

import _404 from './components/404'
import Home from './components/Home'
import Login from './components/Login'
import Main from './components/Main'
import Signup from './components/Signup'

if(!localStorage.getItem("language")){

  localStorage.setItem("language","en")
}

ReactDOM.render(
    < BrowserRouter >
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/main" component={Main} />
          <Route component={_404} />
        </Switch>
    </ BrowserRouter >,
  document.getElementById('root')
);

