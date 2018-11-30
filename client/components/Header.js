import React, { Component } from 'react';
import { Divider, Drawer, IconButton, Icon, Typography } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';
import LandingPage from './LandingPage';
import Login from './Login';
import Classroom from './Classroom';
import Menu from './Menu';
import LanguageSelection from './LanguageSelection';
import SelectLanguage from './SelectLanguage';


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
  	  <div className="nav">
  	    <div>
  	    <div className="menuIcon">
  	      <IconButton onClick={this.handleDrawerToggle}><Icon>menu</Icon></IconButton>
  	    </div>
  	    <Drawer variant="temporary"
  	    	    anchor='right'
                open={mobileOpen}
                onClose={handleDrawerToggle}>
          <Menu />
          <Divider />
          <div className="selectContainer">
	          <div><Typography variant="h6">Translate From:</Typography>
	          <SelectLanguage type="translateFrom" /></div>
	          <div><Typography variant="h6">Translate To:</Typography>
	          <SelectLanguage type="translateTo" /></div>
          </div>
  	    </Drawer>
  	    </div>
  	  </div>
  	)
  }
}

export default Header