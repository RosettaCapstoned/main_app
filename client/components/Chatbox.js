import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, IconButton, Icon, Paper } from '@material-ui/core';
// import io from 'socket.io-client';
import SocketSingleton from '../utils/SocketSingleton';
import { sendMessage, receiveMessage } from '../store/message';
import SelectLanguage from './SelectLanguage';

// const socket = io();

const socket = new SocketSingleton().socket;

class Chatbox extends Component {
	constructor (props) {
		super(props);

		this.state = {
			textInput: '',
			languageSetting: {
				to: 'es',
				from: 'en'
			}
		}
	}

	componentDidMount = () => {
		socket.on('message', (message)=> {
			console.log('message received: ', message);
			this.props.receiveMessage(message);
		})

	}

  handleChange = (evt) => {
  	this.setState({
			textInput: evt.target.value
		})
  }

  handleClick = () => {
		this.props.sendMessage(this.state.textInput, this.state.languageSetting);
		this.setState({ textInput: '' });
		TextField.value = '';
  }

  render(){
		const { messages } = this.props;
		const { handleChange, handleClick } = this;
		console.log(messages);
  	return (
  	  <div className="chat">
  	  <div className="chatHeadline">
  	  </div>
  	  	<Paper className="chatContainer">
  	  	{messages && messages.map((each, idx) => {
  	  	  return (
  	  	  	<div>
  	  	  	<Typography key={idx}>{each.message}</Typography>
  	  	  	</div>
  	  	  )
  	  	})}
  	  	</Paper>
  	    <TextField placeholder="Write a message!"
						 multiline
						 value={this.state.textInput}
  				   rows={8}
  				   rowsMax={12}
  				   style={{ width:"300px" }}
  				   margin="normal"
          		   variant="outlined"
          		   onChange={handleChange}/>
	    <div className="chatButtonContainer">
	      <IconButton onClick={handleClick}><Icon>send</Icon></IconButton>
	    </div>
  	  </div>
  	)
  }
}

const mapStateToProps = ({ message, user }) => {
  return {
		messages: message,
  }
}

const mapDispatchToProps = dispatch => ({
	sendMessage: (message, languageSetting) => {
		dispatch(sendMessage({message, languageSetting}));
		socket.emit('message', {message, languageSetting});
	},
	receiveMessage: (message) => dispatch(sendMessage({ message }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);