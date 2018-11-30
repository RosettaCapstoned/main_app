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
  	    <div className="sectionContainer">
  	      <RosettaCapstoneLogo />
		  </div>
		  <Divider />
		<div className="sectionContainer about">
	      <AboutUs />
	    </div>
	    <Divider />
	    <div className="sectionContainer">
	      <WhatWeDo />
	    </div>
	    <Divider />
	    <div className="sectionContainer bio">
	      <OurTeam />
	    </div>
	    <Divider />
  	  </Fragment>
  	)
  }
}

export default LandingPage;