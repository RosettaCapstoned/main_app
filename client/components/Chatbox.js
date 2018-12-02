import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, IconButton, Icon, Paper, Avatar, Snackbar, SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import io from 'socket.io-client';
import SocketSingleton from '../utils/SocketSingleton';
import { sendMessage } from '../store/message';
import SelectLanguage from './SelectLanguage';

const styles = theme => ({
  primary: {
    backgroundColor: "#0F4FFE",
    padding: 2,
    margin: 3,
    width: 70,
    opacity: 0.6,
    overflow: "auto",
    overflowWrap: "break-word",
    hyphens: "auto"
  },
  secondary: {
    backgroundColor: "#FD9764",
    width: 70,
    padding: 2,
    margin: 3,
    opacity: 0.6,
    overflow: "auto",
    overflowWrap: "break-word",
    hyphens: "auto"
  },
  message: {
  	display: 'flex',
  	padding: 0,
    margin: 0,
    height: 70,
  },
  msgBox: {
  	height: "auto",
  	width: '70%',
  	padding: 3
  }
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
		const { messages, user, classes } = this.props;
		const { handleChange, handleClick } = this;
		// console.log(messages);
		const name = user.firstName || user[0].firstName;
  	return (
  	  <div className="chat">
  	  	<Paper className="chatContainer">
  	  	{messages && messages.map((each, idx) => {
					console.log('This is the new message and user: ', each)
  	  	  return (
  	  	  	<div className={classes.msgBox} key={idx}>
  	  	  		{each.name ?
  	  	  		(<div className="msgLine">
  	  	  		  <Typography><b>{each.name}</b>: </Typography>
  	  	  		  <SnackbarContent aria-describedby="client-snackbar"
  	  	  		    message={<body className={classes.message}>{each.message}</body>}
  	  	  		    className={each.name === name ? 
  	  	  			classNames(classes["primary"]) : 
  	  	  			classNames(classes["secondary"])}/>
  	  	  		</div>) :
  	  	  		(<div className="msgLine">
  	  	  		  <Typography><b>{each.message.name}</b>: </Typography>
					<SnackbarContent aria-describedby="client-snackbar"
					  message={<body className={classes.message}>{each.message.message}</body>}
  	  	  		      className={each.message.name === name ? 
  	  	  			  classNames(classes["primary"]) : 
  	  	  			  classNames(classes["secondary"])}/>
  	  	  			</div>) 
  	  	  	}
  	  	  	</div>
  	  	  )
  	  	})}
  	  	</Paper>
  	  	<div style={{height: '30%', display: 'flex', flexDirection: 'column'}}>
  	    <TextField placeholder="Write a message!"
				   multiline
				   value={this.state.textInput}
  				   rows={8}
  				   rowsMax={12}
  				   style={{ width:"auto", height: '100%', margin: '0px 5px 0px 5px', backgroundColor: 'white' }}
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
  className: PropTypes.string,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};

const mapStateToProps = ({ message, auth, translation }) => {
  const { lngTo, lngFrom } = translation;
  return {
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