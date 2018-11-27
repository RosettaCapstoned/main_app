import React from 'react';
import { IconButton, Icon } from '@material-ui/core';
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
        <h1>{room.providedName}</h1>
        <span>Total people in classroom: {peers.length}</span>
        <div>
          <div className="screen">
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
            <GridLayout
              className="videoGrid"
              items={[
                ...localVideo,
                ...remoteVideos,
              ]} /* renders videos in a list */
              renderCell={item => {
                //console.log(item);
                return <Video media={item} />;
              }}
            />
          </div>
        </div>
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
