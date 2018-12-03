import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Typography, Paper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider, Connected, Connecting, Disconnected, RemoteAudioPlayer }  from '@andyet/simplewebrtc';
import Header from './Header';
import Video from './Video';
import Chatbox from './Chatbox';
import Transcription from './Transcription';
import SocketSingleton from '../utils/SocketSingleton'

const API_KEY = '75558107906217b9a6192969';

const ROOM_NAME = 'YOUR_ROOM_NAME';   //will change name based on teacher's id
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD'; //same with password
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`

const socket = new SocketSingleton().socket

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
});

class Connection extends Component {
  render(){
		const { auth } = this.props
		console.log(auth)
  	return (
			<Provider configUrl={CONFIG_URL} userData={auth}>
				<div>
				<Header type="classroomHeader"/>
				<Paper className="paperContainer">
				<Grid container direction='row'>
				  <Grid item className="gridConnection">	
					<RemoteAudioPlayer />
					<Connecting>									
						<h3>Connecting</h3>				
						<CircularProgress />
					</Connecting>
					<Connected>
						<Video />
					</Connected>
					</Grid>
					<Grid item className="gridTranscript">				
					<div>
					  <Typography align='justify'>{auth.firstName || auth[0].firstName || 'Anonymous'}</Typography>
					  <Transcription/>									
					</div>
					<Disconnected>
					  <CircularProgress />
					</Disconnected>
				  </Grid>
				</Grid>
					</Paper>
				</div>
			</Provider>
  	)
  }
}

Connection.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(withStyles(styles)(Connection))
