import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Classroom from './Classroom';

export default class App extends Component {

  render() {
  	const renderLogin = ({ history }) => <Login history={history} />;
  	return (
  	<Router>
  	  <div>
  	      <Route component={Header}/>
		  <Route exact path='/classroom' component={Classroom}/>
		  <Route exact path='/login' render={renderLogin}/>
  	      <Route path='/' component={LandingPage}/>
  	      <Route path='/auth/google'/>
  	  </div>
    </Router>
  	)
  }
}