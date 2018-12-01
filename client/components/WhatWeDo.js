import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class AboutUs extends Component {

  render(){

  	return (
  	  <div className="sectionContainer whatwedo">
				<Typography variant='h1' 
  	  						color='primary' 
  	  						align="left"
  	  	  					className="footerLogo"
  	  	  					style={{fontFamily: 'Georgia, serif'}}>
					 What We Do
				</Typography>
				<Typography variant='h5' 
  	  						color='textPrimary' 
  	  						align="left"
  	  	  					className="description"
  	  	  					style={{fontFamily: 'Georgia, serif', padding: '15px 0px 0px 0px'}}>
           Rosetta Capstone is a <b>real time interactive learning platform</b>. It’s primarily used to teach users a language they want to learn via a real instructor. The instructor will stream themselves teaching and speaking a particular language. The audio stream will be translated in real time and displayed in the form of text on screen for the students. Each student will see text in the language they selected themselves.
					 <br />
				</Typography>
  	  </div>
  	)
  }
}