import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, IconButton, Icon } from '@material-ui/core';
import { inputMsg, _translate } from '../store/gtranslate';

class Chatbox extends Component {

  handleChange = (evt) => {
  	const { inputMsg, input } = this.props;
  	inputMsg(evt.target.value);
  }

  handleClick = () => {
  	const { input, translate, speakingLng } = this.props;
  	console.log(input);
  	translate(input, speakingLng, 'es');
  }

  render(){
  	const { input, chatbox } = this.props;
  	const { handleChange, handleClick } = this;
  	return (
  	  <div className="chat">
  	  	<Typography alignLeft variant="h5">Connected</Typography>
  	  	<div className="chatContainer">
  	  	{chatbox && chatbox.map(each => {
  	  	  return (
  	  	  	<div>
  	  	  	<Typography variant="body">{each}</Typography>
  	  	  	</div>
  	  	  )
  	  	})}
  	  	</div>
  	    <TextField placeholder="Write a message!"
  				   multiline
  				   rows={8}
  				   rowsMax={12}
  				   style={{ width:"300px" }}
  				   margin="normal"
          		   variant="outlined"
          		   onChange={handleChange}/>
	    <div className="chatButton">
	      <IconButton onClick={handleClick}><Icon>create</Icon></IconButton>
	    </div>
  	  </div>
  	)
  }
}

const mapStateToProps = ({ translation }) => {
  const { input, chatbox, speakingLng } = translation;
  // console.log(translation, chatbox);
  return {
  	input,
  	chatbox,
  	speakingLng
  }
}

const mapDispatchToProps = dispatch => ({
  inputMsg: (text) => dispatch(inputMsg(text)),
  translate: (text, from, to) => dispatch(_translate(text, from, to))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);