import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, 
		 Typography, 
		 IconButton, 
		 Icon, 
		 Paper, 
		 Avatar, 
		 AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import SocketSingleton from '../utils/SocketSingleton';
import { sendMessage } from '../store/message';
import SelectLanguage from './SelectLanguage';

const styles = theme => ({
  primary: {
    backgroundColor: "#0F4FFE",
    opacity: 0.9,
    overflow: "auto",
    overflowWrap: "break-word",
    hyphens: "auto"
  },
  secondary: {
    backgroundColor: "#FD9764",
    opacity: 0.9,
    overflow: "auto",
    overflowWrap: "break-word",
    hyphens: "auto"  
  },
  message: {
  	display: 'flex',
  	paddingLeft: 20,
  	paddingRight: 20
  },
  avatar: {
    margin: 2,
    padding: 2,
    backgroundColor: 'black',
    color: 'white'
  },
});

const socket = new SocketSingleton().socket;

class Chatbox extends Component {
	constructor (props) {
		super(props);

		this.state = {
			textInput: '',
			languageSetting: {
				to: this.props.to,
				from: this.props.from
			}
		}
	}

  handleChange = (evt) => {
  	this.setState({
			textInput: evt.target.value
		})
  }

  handleClick = () => {
	let { from, to, user } = this.props;
	// console.log('This is coming from click handler: ', to, from)
	to = to //|| 'es';
	from = from //|| 'en';  
  	const name = user[0] ? user[0].firstName : user.firstName;
  	const languageSetting = { to, from };
	this.props.sendMessage(name, this.state.textInput, languageSetting || this.state.languageSetting);
    $("#chat").stop().animate({ scrollTop: $("#chat")[0].scrollHeight}, 1000);
	this.setState({ textInput: '' });
	TextField.value = '';
  }

  render(){
		const { messages, user, classes, auth } = this.props;
		const { handleChange, handleClick } = this;
		const { primary, secondary, message, avatar } = classes;
		const name = auth.role || 'Student'
		// const name = user.firstName || 'Student'user[0].firstName;
  	return (
  	  <div >
      <div className="chat-room">
        <AppBar position="static" align='center' style={{ backgroundColor: '#FD9764'}}>
          <Typography variant="h4" color="textPrimary" style={{ fontFamily: 'Georgia, serif', opacity: 0.8 }}>
            rcsCHAT
          </Typography>
          </AppBar>
 		<Paper className="chatContainer" id="chat">
          <ul className="list-unstyled chat" id="chatList">
          {messages && messages.map((each, idx) => {
					console.log('This is the new message and user: ', each)
  	  	  return (
            <li className="d-flex justify-content-between" style={{padding: 5}}>
			  <Avatar className={avatar}>{each.name ? each.name[0] : each.message.name[0]}</Avatar>              
				{each.name ? (<div className="chat-body pull-left card primary p-3 ml-2 z-depth-1">
                <p className="mb-0">
                  {each.message}
                </p>
              </div>) :
              (<div className="chat-body pull-left card primary p-3 ml-2 z-depth-1">
                <p className="mb-0">
                  {each.message.message}
                </p>
              </div>)
          }
            </li>
            )})
      	  }
          </ul>
      </Paper>
      </div>
  	  	<div style={{height: '30%', display: 'flex', flexDirection: 'column'}}>
  	    <TextField placeholder="Write a message!"
				   multiline
				   value={this.state.textInput}
  				   rows={8}
  				   rowsMax={12}
  				   style={{ width:"auto", height: '90%', margin: '0px 7px 0px 7px', backgroundColor: 'white' }}
          		   variant="outlined"
          		   onChange={handleChange}/>
        <div className="chatButtonContainer">
	      <IconButton onClick={handleClick}><Icon style={{ color: '#FD9764'}}>send</Icon></IconButton>
	    </div>
	    </div>
  	  </div>
  	)
  }
}

Chatbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ message, auth, translation }) => {
  const { lngTo, lngFrom } = translation;
  return {
		auth,
		messages: message,
		from: lngFrom,
		to: lngTo,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chatbox));