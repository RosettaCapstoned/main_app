import React from 'react';
import { IconButton, Icon, Typography } from '@material-ui/core';
import { MicOff, Mic } from '@material-ui/icons';
import {
  MediaControls, //might need
  UserControls,
  Video,
  GridLayout,
} from '@andyet/simplewebrtc';
import VoiceRecognition from './VoiceRecognition';
import { connect } from 'react-redux';

class Classroom extends React.Component {
  constructor() {
    super();

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  handleStart() {
    console.log('Speech recognition started');
  }

  handleEnd() {
    console.log('Speech recognition ended');
  }

  handleResult(text) {
    console.log(text.finalTranscript);
  }
  render() {
    const { room, peers, localMedia, remoteMedia } = this.props;
    const remoteVideos = remoteMedia.filter(media => media.kind === 'video');
    const localVideo = localMedia.filter(
      media => media.kind === 'video' && media.shared
    );

    return (
      <div className="screenContainer">
        <div>
          <div className="screen">
            <GridLayout
              className="videoGrid"
              items={[
                ...localVideo,
                ...remoteVideos,
              ]} /* renders videos in a list */
              renderCell={item => {
                //console.log(item);
                return <Video media={item}  />;
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
        <Typography variant="h3" alignCenter>{room.providedName}</Typography>
        <Typography variant="h6" alignCenter>Total people in classroom: {peers.length}</Typography>
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

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user,
  };
};

export default connect(mapStateToProps)(Classroom);
