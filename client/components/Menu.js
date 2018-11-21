import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

class Menu extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render(){

    return (
        <List style={{ display: 'flex', flexDirection: 'column'}}>
            <ListItem button component={Link} to='/' key='Home'>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button component={Link} to='/login' key='Login'>
              <ListItemText primary='Login' />
            </ListItem>
            <ListItem button component={Link} to='/classroom' key='Classroom'>
              <ListItemText primary='Join Classroom' />
            </ListItem>
        </List>
    )
  }
}

export default Menu;