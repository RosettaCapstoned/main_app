import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Divider } from '@material-ui/core';

class Transcription extends Component {

  render(){
  	const { messageLog } = this.props;
  	return (
  	  <Paper className="transcriptionContainer">
  	  <Typography variant="h4"
  	  			  style={{fontFamily: 'Georgia, serif'}}>Lecture</Typography>
  	  <Divider />
  	  {messageLog && messageLog.map(each => {
  	  	return (
  	  	  <div>
  	  	    <Typography variant="body1">{each}</Typography>
  	  	  </div>
  	  	)
  	  })}
  	  </Paper>
  	)
  }
}

const mapStateToProps = ({ speechText }) => {
  const { messageLog } = speechText;
  return {
  	messageLog
  }
}

export default connect(mapStateToProps)(Transcription);