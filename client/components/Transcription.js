import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Divider } from '@material-ui/core';

class Transcription extends Component {

  // componentDidMount(){
  // 	$("#tc").stop().animate({ scrollTop: $("#tc")[0].scrollHeight}, 1000);
  // }

  render(){
  	const { messageLog } = this.props;
  	return (
  	  <div className="transcriptionContainer tc">
  	  <Typography variant="h4"
  	  			  style={{fontFamily: 'Georgia, serif', color: '#414C56'}}>Lecture</Typography>
  	  <Divider />
  	  {messageLog && messageLog.map(each => {
  	  	return (
  	  	  <div>
  	  	    <Typography variant="body1">{each}</Typography>
  	  	  </div>
  	  	)
  	  })}
  	  </div>
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