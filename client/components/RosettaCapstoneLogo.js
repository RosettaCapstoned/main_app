import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class RosettaCapstoneLogo extends Component {

  render() {

  	return(
  	  <div>
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
  	)
  }
}