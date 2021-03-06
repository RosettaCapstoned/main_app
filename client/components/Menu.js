import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText } from '@material-ui/core';

import { logout } from '../store/auth';

class Menu extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { auth, logOut } = this.props;
    const loggedIn =
      auth.id || auth.token || window.localStorage.getItem('token');
    // console.log(loggedIn);
    return (
      <List className="menuList">
        <ListItem button component={Link} to="/" key="Home">
          <ListItemText primary="Home" />
        </ListItem>
        {loggedIn ? (
          <ListItem
            button
            onClick={() => logOut(auth)}
            component={Link}
            to="/login"
            key="Logout"
          >
            <ListItemText primary="Log Out" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login" key="Login">
            <ListItemText primary="Login/SignUp" />
          </ListItem>
        )}
        {loggedIn ? (
          <ListItem button component={Link} to="/classroom" key="Classroom">
            <ListItemText primary="Join Classroom" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login" key="RedirectToLogin">
            <ListItemText primary="Join Classroom" />
          </ListItem>
        )}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: auth => dispatch(logout(auth)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
