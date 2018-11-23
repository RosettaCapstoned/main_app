import React from 'react'
import {
  MediaControls,  //might need
  UserControls,
  Video,
  GridLayout,
} from '@andyet/simplewebrtc';

class Classroom extends React.Component{

  render(){
    const { room, peers, localMedia, remoteMedia } = this.props

    const remoteVideos = remoteMedia.filter(media => media.kind === 'video')
    const localVideo = localMedia.filter(media => media.kind === 'video' && media.shared)

    return (
      <div>
        <h1>{room.providedName}</h1>
        <span>Total people in classroom: {peers.length}</span>
        <div>
          <GridLayout       
            items={[...localVideo, ...remoteVideos]}          /* renders videos in a list */
            renderCell={(item) => (<Video media={item}/>)}
          />
        </div>
        <UserControls 
          render={({ isMuted, mute, unmute }) => {
            return <button onClick={() => isMute? unmute() : mute()}>{isMuted? 'Unmuite' : 'Mute'}</button>
          }}
        />
      </div>
    )
  }
}

export default Classroom