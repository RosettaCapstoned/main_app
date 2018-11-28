import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import Login from './Login';
import Header from './Header';
import Connection from './Connection';
import SignUp from './SignUp';
import { checkOAuthToken } from '../store/auth';

class App extends Component {
  componentDidMount() {
    const { checkOAuthToken } = this.props;
    checkOAuthToken();
  }

  render() {
    const renderLogin = ({ history }) => <Login history={history} />;
    const { token } = this.props;
    console.log('Token rendered from App: ', token);
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Switch>
            <Route exact path="/classroom" component={Connection} />
            <Route exact path="/login" render={renderLogin} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/auth/google" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  //console.log(auth)
  return {
    token: auth ? auth.auth : false,
  };
};
const mapDispatchToProps = dispatch => ({
  checkOAuthToken: () => dispatch(checkOAuthToken()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
