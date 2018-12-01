import React, { Component, Fragment } from 'react';
import { Typography, Divider } from '@material-ui/core';
import RosettaCapstoneLogo from './RosettaCapstoneLogo';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';
import OurTeam from './OurTeam';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <Fragment>
  	    <RosettaCapstoneLogo />
	      <AboutUs />
	      <WhatWeDo />
	      <OurTeam />
  	  </Fragment>
  	)
  }
}

export default LandingPage;