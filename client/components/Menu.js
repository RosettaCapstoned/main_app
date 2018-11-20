import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

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
          <Button component={Link} to='/'>
            <ListItem button key='Home'>
              <ListItemText primary='Home' />
            </ListItem>
          </Button>
          <Button component={Link} to='/login'>
            <ListItem button key='Login'>
              <ListItemText primary='Login' />
            </ListItem>
          </Button>
          <Button component={Link} to='/classroom'>
            <ListItem button key='Classroom'>
              <ListItemText primary='Join Classroom' />
            </ListItem>
           </Button>
        </List>
    )
  }
}

export default Menu;