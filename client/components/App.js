import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';

import Classroom from './Classroom';


export default class App extends Component {

  render() {

  	return (
  	<Router>
  	  <div>
  	    <Switch>
  	      <Route component={Header}/>
  	      <Route exact path='/' component={LandingPage}/>
  	      <Route exact path='/login' component={Login}/>
  	      <Route exact path='/classroom' component={Classroom}/>

  	    </Switch>
  	  </div>
    </Router>
  	)
  }
}