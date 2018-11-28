import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, IconButton, Icon } from '@material-ui/core';
import io from 'socket.io-client';
import { sendMessage, receiveMessage } from '../store/message';
import SelectLanguage from './SelectLanguage';

const socket = io();

class Chatbox extends Component {
	constructor (props) {
		super(props);

		this.state = {
			textInput: '',
			langaugeSetting: {
				to: 'es',
				frome: 'en'
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
		this.props.sendMessage(this.state.textInput, this.state.langaugeSetting);
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
  	  	{/*<Typography align="left" variant="h5">Connected</Typography>*/}
  	  	<SelectLanguage />
  	  </div>
  	  	<div className="chatContainer">
  	  	{messages && messages.map((each, idx) => {
  	  	  return (
  	  	  	<div>
  	  	  	<Typography key={idx}>{each.message}</Typography>
  	  	  	</div>
  	  	  )
  	  	})}
  	  	</div>
  	    <TextField placeholder="Write a message!"
						 multiline
						 value={this.state.textInput}
  				   rows={8}
  				   rowsMax={12}
  				   style={{ width:"300px" }}
  				   margin="normal"
          		   variant="outlined"
          		   onChange={handleChange}/>
	    <div className="chatButton">
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
	sendMessage: (message, langaugeSetting) => {
		dispatch(sendMessage({message, langaugeSetting}));
		socket.emit('message', {message, langaugeSetting});
	},
	receiveMessage: (message) => dispatch(sendMessage({ message }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);