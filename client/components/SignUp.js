import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { FormGroup, TextField, Button, Paper } from '@material-ui/core';
import { signUp } from '../store/auth';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      err: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleClick = (ev) => {
    ev.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    this.props.signUp({ email, password, firstName, lastName })
      .catch(err => {
        this.setState({ err: err.message })
      });
  }

  render(){
    const { email, password, firstName, lastName } = this.state;
    const { handleChange, handleClick } = this;
    console.log(this.state)
    return (
      <Paper className="loginContainer">
        <div >
          <FormGroup>
            <TextField
              id="standard-name"
              label="First Name"
              type="text"
              value={firstName}
              name="firstName"
              margin="normal"
              required={true}
              variant="filled"
              onChange={handleChange}
            />
             <TextField
              id="standard-required"
              label="Last Name"
              type="text"
              value={lastName}
              name="lastName"
              margin="normal"
              required={true}
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              margin="normal"
              required={true}
              variant="filled"
              onChange={handleChange}
            />
            &nbsp;
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              margin="normal"
              required={true}
              variant="filled"
              onChange={handleChange}
            />
            <br />
            <Button
              disabled={!(email && password)}
              label="Submit"
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Sign Up
            </Button>
            <div>Have an account? Sign in {<Link to='/login'>Here.</Link>}</div>
          </FormGroup>
          <h2>{this.state.err}</h2>
        </div>
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    signUp: (credentials)=> dispatch(signUp(credentials, history))
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
