import React from 'react';
import Fullscreen from 'react-full-screen'
import { IconButton, Icon, Typography, Button } from '@material-ui/core';
import { MicOff, Mic } from '@material-ui/icons';
import { UserControls, GridLayout, Video } from '@andyet/simplewebrtc';
import { connect } from 'react-redux';
import VoiceRecognition from './VoiceRecognition';
import StudentList from './StudentList';
import ModifiedVideo from './ModifiedVideo'
import SocketSingleton from '../utils/SocketSingleton';
import { receiveSpeechText } from '../store/speechText';
import { addStreamId } from '../store/teacherStreamId'

const socket = new SocketSingleton().socket;

class Classroom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      localStream: {},
      isFull: false
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.goFull = this.goFull.bind(this)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.localStream.id !== this.state.localStream.id) {
      const { auth, addStreamId } = this.props;
      if (auth.role === 'Teacher') {
        addStreamId(this.state.localStream.id)
        socket.emit('teacherStreamId', { teacherStreamId: this.state.localStream.id, /* roomId: auth.room.id */})
      } else {
        console.log(this.state.localStream.id)
        socket.emit('studentStreamId', { studentStreamId: this.state.localStream.id })
      }
    }
  };
  goFull(){
    this.setState({ isFull: true })
  }

  handleStart() {
    // console.log('Speech recognition started');
  }

  handleEnd() {
    // console.log('Speech recognition ended');
  }

  handleResult({ interimTranscript, finalTranscript }) {
    // console.log(this.props.translation);
    const { lngFrom, lngTo } = this.props.translation;
    const languageSetting = {
      to: lngTo,
      from: lngFrom,
    };
    const auth = this.props.auth;
    const name = auth[0] ? auth[0].firstName : auth.firstName;
    socket.emit('teacherSpeech', {
      name,
      message: finalTranscript,
      languageSetting,
    });
    //console.log(this.props.speechText.messageLog);
  }
  render() {
    const { room, peers, localMedia, remoteMedia, auth } = this.props;
    const remoteVideos = remoteMedia.filter(media => media.kind === 'video');
    const localVideo = localMedia.filter(
      media => media.kind === 'video' && media.shared
    );
    if (
      localVideo.length > 0 &&
      this.state.localStream.id !== localVideo[0].id
    ) {
      this.setState({ localStream: localVideo[0] });
    }

    console.log(localMedia);
    // console.log('Remote:', remoteVideos)
    return (
      <div>
        <div className="screenContainer">
          <StudentList />
          <div className="screen">
            <Fullscreen enabled={this.state.isFull}>
              <GridLayout
                className="videoGrid"
                items={[...localVideo, ...remoteVideos]}
                renderCell={item => {
                  return <ModifiedVideo media={item} />;
                }}
              />
            </Fullscreen>
          </div>
          <div className="vidControlsContainer">
          <UserControls
            render={({ isMuted, mute, unmute }) => {
              return (
                <IconButton
                  className="iconsbg"
                  id="muteButton"
                  onClick={() => (isMuted ? unmute() : mute())}
                >
                  <Icon className="icons">{isMuted ? "mic" : "mic_off"}</Icon>
                </IconButton>
              );
            }}
          />
          <IconButton className="iconsbg" onClick={this.goFull}><Icon className="icons">desktop_windows</Icon></IconButton>
          </div>
        </div>
        <Typography variant="h3" align="center">
          {'English 101'/* {room.providedName} */}
        </Typography>
        <Typography variant="h6" align="center">
          Total people in classroom: {peers.length + 1}
        </Typography>
        {this.props.user.role === 'Teacher' ||
        this.props.auth.role === 'Teacher' ? (
          <VoiceRecognition
            onStart={this.handleStart}
            onEnd={this.handleEnd}
            onResult={this.handleResult}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, speechText, translation, teacherStreamId }) => {
  return {
    teacherStreamId,
    auth,
    user,
    speechText,
    translation,
  };
};

const mapDispatchToProps = dispatch => ({
  receiveSpeechText: speechText => dispatch(receiveSpeechText(speechText)),
  addStreamId: id => dispatch(addStreamId(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
