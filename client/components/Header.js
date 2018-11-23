import React, { Component } from 'react';
import { Typography, Divider, Drawer, IconButton, Icon } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';
import LandingPage from './LandingPage';
import Login from './Login';
import Classroom from './Classroom';
import Menu from './Menu';

// const styles = theme => ({
//   headerContainer: {
//   	display: 'flex',
//     justifyContent: 'space-between',
//     flexDirection: 'row'
//   },
// });

class Header extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render(){
  	const { handleDrawerToggle } = this;
  	const { mobileOpen } = this.state;
  	const componentMap = {
  	  'Home': '/',
  	  'Login': '/login',
  	  'Join Classroom': '/classroom'
  	}
  	return (
  	  <div className="menuIcon">
  	  <div className="menuIcon">
  	    <IconButton onClick={this.handleDrawerToggle}><Icon>menu</Icon></IconButton>
  	  </div>
  	    <Drawer variant="temporary"
  	    		anchor='right'
                open={mobileOpen}
                onClose={handleDrawerToggle}>
        <Menu />
        <Divider />
  	  </Drawer>
  	  <Typography variant='display4' 
  	  			  color='textPrimary' 
  	  			  style={{ fontFamily: 'Georgia, serif', 
						   position: 'fixed', 
						   bottom: '0' }}>Rosetta Capstone</Typography>
  	  </div>
  	)
  }
}

export default Header;