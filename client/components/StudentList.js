import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class StudentList extends React.Component{
  constructor(){
    super()
    this.state = {
      students: []
    }
  }
  componentDidMount(){
    const { id } = this.props.auth
    return axios.get(`/api/user/students/${id}`)
    .then(res => res.data)
    .then(students => {
      console.log(students)
      this.setState({ students })})
  }
  render(){
    const { students } = this.state
    return (
      <div>
        {students.map(student => {
          return (
            <div key={student.id}>
              <h4>{student.firstName} {student.lastName}</h4>
              <span>Native language: ...</span>
            </div>
          )
        })}

      </div>
    )
     
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

module.exports = connect(mapStateToProps, null)(StudentList)