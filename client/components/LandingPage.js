import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <div>
				<Typography variant='display4' 
  	  						color='textPrimary' 
  	  	  					className="footerLogo"
  	  	  					style={{fontFamily: 'Georgia, serif'}}>
					 Rosetta Capstone
				</Typography>
  	  </div>
  	)
  }
}

export default LandingPage;