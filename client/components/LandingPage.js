import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <div className="landingContainer">
  	    <div className="sectionContainer">
				<Typography variant='display4' 
  	  						color='textPrimary' 
  	  						align="center"
  	  	  					className="footerLogo"
  	  	  					style={{fontFamily: 'Georgia, serif'}}>
					 Rosetta Capstone
				</Typography>
				<Typography variant='h3' 
  	  						color='secondary' 
  	  						align="center"
  	  	  					className="footerLogo"
  	  	  					style={{fontFamily: 'Georgia, serif'}}>
					 Bringing English to you
				</Typography>
		  </div>
		  <Divider />
		<div className="sectionContainer">
	      <AboutUs />
	    </div>
	    <Divider />
	    <div className="sectionContainer">
	      <WhatWeDo />
	    </div>
	    <Divider />
  	  </div>
  	)
  }
}

export default LandingPage;