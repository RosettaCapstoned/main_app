import React from 'react';
import { IconButton, Icon, Typography } from '@material-ui/core';
import { MicOff, Mic } from '@material-ui/icons';
import {
  MediaControls,
  UserControls,
  Video,
  GridLayout,
} from '@andyet/simplewebrtc';
import { connect } from 'react-redux';
import VoiceRecognition from './VoiceRecognition';
import StudentList from './StudentList';
import SocketSingleton from '../utils/SocketSingleton';
import { receiveSpeechText } from '../store/speechText';

const socket = new SocketSingleton().socket;

class Classroom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      localStream: {}
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.localStream.id !== this.state.localStream.id){
      console.log(this.state)
      console.log(this.props)
      const { auth } = this.props
      if(auth.role === 'Teacher'){
        //socket.emit('teacherStreamId', this.state.localStream.id)
      } else if(auth.role === 'Student'){
        //socket.emit('studentStreamId', this.state.localStream.id)
      }
    }
  };

  handleStart() {
    console.log('Speech recognition started');
  }

  handleEnd() {
    console.log('Speech recognition ended');
  }

  handleResult({ interimTranscript, finalTranscript }) {
    const languageSetting = {
      to: this.props.translation.translateLng,
      from: 'en',
    };
    socket.emit('teacherSpeech', {
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
    )
    if(localVideo.length > 0 && this.state.localStream.id !== localVideo[0].id){
      this.setState({ localStream: localVideo[0] })
    }
    //  console.log(localVideo);
    // console.log('Remote:', remoteVideos)
    return (
      <div className="screenContainer">
        <div>
          {/*{auth.role === 'Teacher' ? <StudentList /> : null}*/}
          <StudentList />
          <div className="screen">
            <GridLayout
              className="videoGrid"
              items={[...localVideo, ...remoteVideos]}
              renderCell={item => {
                //console.log(item);
                return <Video media={item} />;
              }}
            />
          </div>
          <UserControls
            render={({ isMuted, mute, unmute }) => {
              return (
                <IconButton
                  id="muteButton"
                  onClick={() => (isMuted ? unmute() : mute())}
                >
                  {isMuted ? <Mic /> : <MicOff />}
                </IconButton>
              );
            }}
          />
        </div>
        <Typography variant="h4" align="center">
          {this.props.speechText.currMessage}
        </Typography>
        <Typography variant="h3" align="center">
          {room.providedName}
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

const mapStateToProps = ({ auth, user, speechText, translation }) => {
  return {
    auth,
    user,
    speechText,
    translation,
  };
};

const mapDispatchToProps = dispatch => ({
  receiveSpeechText: speechText => dispatch(receiveSpeechText(speechText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
