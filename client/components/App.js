import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';

export default class App extends Component {

  render() {

  	return (
  	<Router>
  	  <div>
  	    <Switch>
  	      <Route component={Header}/>
  	      <Route exact path='/' component={LandingPage}/>
  	      <Route exact path='/login' component={Login}/>
  	    </Switch>
  	  </div>
    </Router>
  	)
  }
}