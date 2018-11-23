import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core';


class Classroom extends Component {
  render(){
  	return (
  	  	<Paper className="classroomContainer">
				</Paper>
  	)
  }
}

const mapStateToProps = state => {
	console.log(state)
	return {
		state
	}
}

export default connect(mapStateToProps, null)(Classroom)