import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Drawer } from '@material-ui/core';
import StudentAvatars from './StudentAvatars';

class StudentList extends Component{
  state = {
    students: [{id: 1, firstName: "Harry", lastName: "Chen", nativeLng: "Chinese"}, 
               {id: 2, firstName: "Daniel", lastName: "Seeley", nativeLng: "Bengali"},
               {id: 3, firstName: "Kaz", lastName: "K", nativeLng: "Russian"}]
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
    const { students } = this.state
    return (
      <Drawer variant="permanent"
              anchor='left'
              open={true}>
              <div className="studentAvatars">
              {students.map(student => {
                  return (
                    <div key={student.id}>
                    <StudentAvatars student={student} />
                    </div>
                  )
              })}
              </div>
        </Drawer>
    )    
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, null)(StudentList)



