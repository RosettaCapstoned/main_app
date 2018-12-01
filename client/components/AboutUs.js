import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class AboutUs extends Component {

  render(){

  	return (
  	  <div className="sectionContainer about">
				<Typography variant='h1' 
  	  						color='primary' 
  	  						align="left"
  	  	  					className="footerLogo"
  	  	  					style={{fontFamily: 'Georgia, serif'}}>
					 Our Mission
				</Typography>
				<Typography variant='h5' 
  	  						color='textPrimary' 
  	  						align="left"
  	  	  					className="description"
  	  	  					style={{fontFamily: 'Georgia, serif', padding: '15px 0px 0px 0px'}}>
					 In today’s world, an education can be the difference between prosperity and poverty. With all of us being children of immigrants, we know this reality well. Moving to a new country and not knowing the native language is not only scary but it is also a barrier to one’s financial success. 
					 <br/>
					 <br />
					 However, learning the native language can be costly and out of reach for many. <b><i>That’s what Rosetta Capstone intends to solve.</i></b>
					 <br />
				</Typography>
  	  </div>
  	)
  }
}