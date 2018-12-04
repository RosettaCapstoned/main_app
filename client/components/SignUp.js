import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, TextField, Button, Paper } from '@material-ui/core';
import { signUp } from '../store/auth';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      err: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleClick = ev => {
    ev.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    const { history } = this.props;
    this.props
      .signUp({ email, password, firstName, lastName })
      .then(() => history.push('/login'))
      .catch(err => {
        this.setState({ err: err.message });
      });
  };
  handleClose = () => {
    this.props.history.push('/');
  };

  render() {
    const { email, password, firstName, lastName } = this.state;
    const { handleChange, handleClick } = this;

    return (
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Sign Up
          <hr />
        </DialogTitle>
        <DialogContent>
          <div>
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
              <div>
                Have an account? Sign in {<Link to="/login">Here.</Link>}
              </div>
            </FormGroup>
            <h2>{this.state.err}</h2>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    signUp: credentials => dispatch(signUp(credentials, history)),
    history,
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
