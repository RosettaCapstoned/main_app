import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography, Popover, Avatar, IconButton } from '@material-ui/core';

const styles = {
  avatar: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FD9764'
  },
  popup: {
  	padding: 20
  }
};

class StudentAvatars extends Component{
  state = {
    anchorEl: null
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render(){
    const { handlePopoverOpen, handlePopoverClose } = this;
    const { anchorEl } = this.state
    const { classes, student } = this.props;
    const open = Boolean(anchorEl);
    console.log(student);
    return (
  	  <Fragment>
  		<Avatar className={classes.avatar}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                >{student.firstName[0].toUpperCase() + student.lastName[0].toUpperCase()}</Avatar>
          <Popover 
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
          <Typography variant="title" className={classes.popup}>
          <b>{student.firstName} {student.lastName}</b> <br/> {student.nativeLng}</Typography>
          </Popover>
      </Fragment>
    )
  }
}

StudentAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }, { classes, student }) => {
  return {
    auth,
    classes,
    student
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(StudentAvatars))

