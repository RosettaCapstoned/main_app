import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, TextField, Button, Paper } from '@material-ui/core';
import { login } from '../store/auth';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: '',
    };
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleClick = ev => {
    ev.preventDefault();
    const { email, password } = this.state;
    this.props
      .login({ email, password })
      .catch(err => this.setState({ err: 'Invalid Login Credentials' }));
  };
  handleClose = () => {
    this.props.history.push('/');
  };

  render() {
    const { email, password } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Login
          <hr />
        </DialogTitle>
        <DialogContent>
          <div>
            <FormGroup>
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
                Sign in
              </Button>
              <Paper className="googleButton">
                <Button href="/auth/google">
                  <img
                    width="20px"
                    alt='Google "G" Logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  Sign in with Google
                </Button>
              </Paper>
              <div>
                Don't have an account? Sign Up {<Link to="/signup">Here.</Link>}
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
    login: credentials => dispatch(login(credentials, history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
