import React, { Component } from 'react';
import { Typography, Divider } from '@material-ui/core';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';
import OurTeam from './OurTeam';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <div >
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
	    <div className="sectionContainer">
	      <OurTeam />
	    </div>
	    <Divider />
  	  </div>
  	)
  }
}

export default LandingPage;