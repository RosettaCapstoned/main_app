import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Drawer, IconButton, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StudentAvatars from './StudentAvatars';
import Chatbox from './Chatbox';

const drawerWidth = 350;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    color: '#414C56',
  },
  message: {
    color: '#FD9764'
  }
});

class StudentList extends Component{
  state = {
    students: [{id: 1, firstName: "Harry", lastName: "Chen", nativeLng: "Chinese"}, 
               {id: 2, firstName: "Daniel", lastName: "Seeley", nativeLng: "Bengali"},
               {id: 3, firstName: "Kaz", lastName: "K", nativeLng: "Russian"}],
    open: false
  }

  handleChatToggle = () => {
    this.setState({ open: !this.state.open })
  }

  // componentDidMount(){
  //   const { id } = this.props.auth
  //   return axios.get(`/api/user/students/${id}`)
  //   .then(res => res.data)
  //   .then(students => {
  //     console.log(students)
  //     this.setState({ students })})
  // }

  render(){
    const { students, open } = this.state
    const { auth, classes } = this.props;
    const { handleChatToggle } = this;
    return (
      <Drawer variant="permanent"
              anchor='left'
              open={true}>
              <div className="studentAvatars">
              {/*auth.role === 'Teacher' ? */}
              {students.map(student => {
                  return (
                    <div key={student.id}>
                    <StudentAvatars student={student} />
                    </div>
                  )
              })}
              {/*: (<div></div>)*/}
              <div className="messageIcon">
                <IconButton className={classes.message} onClick={handleChatToggle}><Icon>chat</Icon></IconButton>
              </div>
              <Drawer variant="temporary"
                      anchor='left'
                      open={open}
                      onClose={handleChatToggle}
                      className={classes.drawer}>
                <Chatbox />
              </Drawer>
              </div>
        </Drawer>
    )    
  }
}

StudentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(StudentList))



