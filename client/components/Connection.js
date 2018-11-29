import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, IconButton, Icon, CircularProgress } from '@material-ui/core';
import { Provider, Connected, Connecting, Disconnected, RemoteAudioPlayer }  from '@andyet/simplewebrtc';
import Video from './Video';
import Chatbox from './Chatbox';

const API_KEY = '75558107906217b9a6192969';

const ROOM_NAME = 'YOUR_ROOM_NAME';   //will change name based on teacher's id
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD'; //same with password
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`



class Connection extends Component {
  render(){
		const { auth } = this.props
  	return (
			<Provider configUrl={CONFIG_URL} userData={auth}>	
				<div>
					<RemoteAudioPlayer />
					<Connecting>									
						<h3>Connecting</h3>				
						<CircularProgress />
					</Connecting>
					<div className="connection">
						<Connected>
							<Video />
							<div>									
								<Chatbox />
							</div>				
						</Connected>
					</div>
				</div>
			</Provider>
  	)
  }
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(Connection)
