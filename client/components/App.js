import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Connection from './Connection'
import SignUp from './SignUp'

export default class App extends Component {

  render() {
  	const renderLogin = ({ history }) => <Login history={history} />;
  	return (
  	<Router>
  	  <div>
  	      <Route component={Header}/>
					<Switch>
						<Route exact path='/classroom' component={Connection}/>
						<Route exact path='/login' render={renderLogin}/>
						<Route exact path='/signup' component={SignUp}/>
						<Route exact path='/' component={LandingPage}/>
						<Route path='/auth/google'/>
					</Switch>
  	  </div>
    </Router>
  	)
  }
}