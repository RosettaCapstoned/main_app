import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Classroom from './Classroom';

export default class App extends Component {

  render() {
  	console.log(window.localStorage.getItem('user'))
  	return (
  	<Router>
  	  <div>
  	      <Route component={Header}/>
  	      <Route path='/' component={LandingPage}/>
  	      <Route exact path='/login' component={Login}/>
  	      <Route exact path='/classroom' component={Classroom}/>
  	  </div>
    </Router>
  	)
  }
}