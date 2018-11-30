import React, { Component } from 'react';
import { Typography, Avatar } from '@material-ui/core';

export default class OurTeam extends Component {

  render() {

  	return (
      <div className="sectionContainer bio">
		<Typography variant='h1' 
  						  color='primary' 
  						  align="left"
  	  					style={{fontFamily: 'Georgia, serif'}}>
			 Our Team
		</Typography>
		<div className="profiles">
		  <div className="profileContainer">
			  <div className="photoPosition"><img className="photo position" src={require("../../public/kevin_headshot.jpg")}/></div>
			  <Typography align="center" variant="h4" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>Kevin Hu</Typography>
			  <Typography align="center" variant="body1" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>
			    I am most accurately a multidisciplinary writer -- passionate about the human story and in building ideas through text that flourish the humans in these stories.
				As a Software Developer, I spend most of my time writing text in the NERDS stack but also dabble with Google tools and technologies. 
				As a freelance writer, I spend most of my time writing in the Asian American writing space. </Typography>
				<div className="avatarContainer">
				  <a href='https://www.linkedin.com/in/kevin-hu-82673529/'>
				    <Avatar className="avatar" src="../../public/linkedin_circle.png"></Avatar>
				  </a>
				  <a href='https://github.com/pkvinhu'>
				    <Avatar className="avatar" src="../../public/github_circle.png"></Avatar>
				  </a>
				</div>				
		  </div>
		  <div className="profileContainer">
			  <div className="photoPosition"><img className="photo position2" src={require("../../public/harry_headshot.JPG")}/></div>
			  <Typography align="center" variant="h4" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>Harry Chen</Typography>
			  <Typography align="center" variant="body1" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>
			    I am a part-time procrastinator, part-time travel afficionado, and full-time web architect of anything agile, clean, and scalable. 
			    You can find me on my spare time globe-trotting in the furthest corners of the world, or sitting on my couch dominating the noobs on DOTA.</Typography>
			    <div className="avatarContainer">
				  <a href='https://www.linkedin.com/in/harrychenhc/'>
				    <Avatar className="avatar" src="../../public/linkedin_circle.png"></Avatar>
				  </a>
				  <a href='https://github.com/phaseharry'>
				    <Avatar className="avatar" src="../../public/github_circle.png"></Avatar>
				  </a>
				</div>	
		  </div>
		  <div className="profileContainer">
			  <div className="photoPosition"><img className="photo position2" src={require("../../public/kaz_headshot.jpg")}/></div>
			  <Typography align="center" variant="h4" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>Kaz Kabyldenov</Typography>
			  <Typography align="center" variant="body1" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>
			    I am a lingua-enthusiast and a Wisconsin fanatic. 
			    My preference is backend engineering and it severely pains me when applications are built without security in mind.</Typography>
			    <div className="avatarContainer">
				  <a>
				    <Avatar className="avatar" src="../../public/linkedin_circle.png"></Avatar>
				  </a>
				  <a href='https://github.com/Kazniyaz'>
				    <Avatar className="avatar" src="../../public/github_circle.png"></Avatar>
				  </a>
				</div>	
		  </div>
		  <div className="profileContainer">
			  <div className="photoPosition"><img className="photo position2" src={require("../../public/rick_headshot.jpg")}/></div>
			  <Typography align="center" variant="h4" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>Daniel Seeley</Typography>
			  <Typography align="center" variant="body1" style={{fontFamily: 'Georgia, serif', padding: '10px'}}>
			    Bio pending....</Typography>
			  <div className="avatarContainer">
				  <a href='https://www.linkedin.com/in/daniel-seeley-54650813/'>
				    <Avatar className="avatar" src="../../public/linkedin_circle.png"></Avatar>
				  </a>
				  <a href='https://github.com/D-Seeley'>
				    <Avatar className="avatar" src="../../public/github_circle.png"></Avatar>
				  </a>
			  </div>	
		  </div>
    </div>
  	)
  }
}