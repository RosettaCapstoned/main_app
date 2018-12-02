import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Drawer, IconButton, Icon, Typography } from '@material-ui/core';
import Menu from './Menu';
import SelectLanguage from './SelectLanguage';

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
  	const { type } = this.props;
  	const componentMap = {
  	  'Home': '/',
  	  'Login': '/login',
  	  'Join Classroom': '/classroom'
  	}
  	return (
  	  <div className={type}>
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

const mapStateToProps = (state, {type}) => ({
  type
})

export default connect(mapStateToProps)(Header);