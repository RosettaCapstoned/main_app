import React, { Component, Fragment } from 'react';
import { Typography, Divider } from '@material-ui/core';
import RosettaCapstoneLogo from './RosettaCapstoneLogo';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';
import OurTeam from './OurTeam';
import Header from './Header';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <Fragment>
  	      <Header type="landingHeader"/>
  	      <RosettaCapstoneLogo />
	      <AboutUs />
	      <WhatWeDo />
	      <OurTeam />
  	  </Fragment>
  	)
  }
}

export default LandingPage;