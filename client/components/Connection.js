import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core';

import { Provider, Connected, Connecting, Disconnected, RemoteAudioPlayer }  from '@andyet/simplewebrtc'

import Video from './Video'

const API_KEY = 'ab446ae790d628e3b493ef90';

const ROOM_NAME = 'YOUR_ROOM_NAME';   //will change name based on teacher's id
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD'; //same with password
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`



class Connection extends Component {
  render(){
  	return (
			<Provider configUrl={CONFIG_URL}>	
  	  	{/* <Paper style={{ margin: '50px' }}>
				</Paper> */}
				<RemoteAudioPlayer />

				<Connecting>									{/* renders the element between it when connecting user to turn/stun server*/}
					<h3>Connecting</h3>					{/* render a loading wheel later */}
				</Connecting>

				<Connected>										{/* renders the element between it when user is connected*/}
					<h3>Connected</h3>					{/* say hi to user */}
					<Video />
				</Connected>

				<Disconnected>
					<h3>Disconnected</h3>
				</Disconnected>

			</Provider>
  	)
  }
}

const mapStateToProps = state => {
	console.log(state)
	return {
		state
	}
}

export default connect(mapStateToProps, null)(Connection)
