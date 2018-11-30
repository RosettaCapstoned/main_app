import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class OurTeam extends Component {

  render() {

  	return (
      <div>
		<Typography variant='h1' 
  						color='primary' 
  						align="left"
  	  					className="footerLogo"
  	  					style={{fontFamily: 'Georgia, serif'}}>
			 Our Team
		</Typography>
		<div className="profiles">

		  <img className="photo position" src={require("../../public/kevin_headshot.jpg")}/>
		  <Typography variant="title">Kevin Hu</Typography>

		  <img className="photo" src={require("../../public/harry_headshot.JPG")}/>
		  <Typography variant="title">Harry Chen</Typography>
		</div>
      </div>
  	)
  }
}