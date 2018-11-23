import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Connection from './Connection'
// import Classroom from './Connection';

export default class App extends Component {

  render() {
  	return (
  	<Router>
  	  <div>
  	      <Route component={Header}/>
					<Route exact path='/classroom' component={Connection}/>
					<Route exact path='/login' component={Login}/>
  	      <Route path='/' component={LandingPage}/>
  	  </div>
    </Router>
  	)
  }
}