import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, IconButton, Icon, Paper } from '@material-ui/core';
// import io from 'socket.io-client';
import SocketSingleton from '../utils/SocketSingleton';
import { sendMessage } from '../store/message';
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
	}

  handleChange = (evt) => {
  	this.setState({
			textInput: evt.target.value
		})
  }

  handleClick = () => {
	let { from, to, user } = this.props;
	console.log('This is coming from click handler: ', to, from)
	to = to //|| 'es';
	from = from //|| 'en';  
  	const name = user[0] ? user[0].firstName : user.firstName;
  	const languageSetting = { to, from };
	this.props.sendMessage(name, this.state.textInput, languageSetting || this.state.languageSetting);
	this.setState({ textInput: '' });
	TextField.value = '';
  }

  render(){
		const { messages } = this.props;
		const { handleChange, handleClick } = this;
		// console.log(messages);
  	return (
  	  <div className="chat">
  	  <div className="chatHeadline">
  	  </div>
  	  	<Paper className="chatContainer">
  	  	{messages && messages.map((each, idx) => {
					console.log('This is the new message and user: ', each)
  	  	  return (
  	  	  	<div key={idx}>
  	  	  		<Typography><b>{each.name ? each.name : each.message.name}</b>: {each.name ? each.message : each.message.message}</Typography> 
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

const mapStateToProps = ({ message, auth, translation }) => {
  const { speakingLng, translateLng } = translation;
  return {
		messages: message,
		from: speakingLng,
		to: translateLng,
		user: auth
  }
}

const mapDispatchToProps = dispatch => ({
	sendMessage: (name, message, languageSetting) => {
		dispatch(sendMessage({name, message, languageSetting}));
		socket.emit('message', {name, message, languageSetting});
	}
	// receiveMessage: (message) => dispatch(sendMessage({ message }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);