import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class LandingPage extends Component {
  
  render(){

  	return (
  	  <div>
				<Typography variant='display4' 
  	  		color='textPrimary' 
  	  	  style={{ fontFamily: 'Georgia, serif', 
					 position: 'relative', 
				   bottom: '0' }}>
					 Rosetta Capstone
				</Typography>
  	  </div>
  	)
  }
}

export default LandingPage;