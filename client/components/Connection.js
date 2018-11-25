import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, IconButton, Icon } from '@material-ui/core';
import { Provider, Connected, Connecting, Disconnected, RemoteAudioPlayer }  from '@andyet/simplewebrtc';
import Video from './Video';
import Chatbox from './Chatbox';

const API_KEY = 'ab446ae790d628e3b493ef90';

const ROOM_NAME = 'YOUR_ROOM_NAME';   //will change name based on teacher's id
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD'; //same with password
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`



class Connection extends Component {
  render(){
  	return (
	<Provider configUrl={CONFIG_URL}>	
	  <div>
	    <div>
		  <RemoteAudioPlayer />
		  <Connecting>									{/* renders the element between it when connecting user to turn/stun server*/}
			<h3>Connecting</h3>					{/* render a loading wheel later */}
		  </Connecting>
		  <Disconnected>
			<h3>Disconnected</h3>
		  </Disconnected>
		</div>
		<div className="connection">
		  <Connected>
		  	<Video />
		    <div>										{/* renders the element between it when user is connected*/}
			  <h3>Connected</h3>
			  <Chatbox />
			</div>					{/* say hi to user */}
		  </Connected>
		</div>
	  </div>
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
