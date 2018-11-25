import React from 'react'
import { IconButton, Icon } from '@material-ui/core'
import { MicOff, Mic } from '@material-ui/icons'
import {
  MediaControls,  //might need
  UserControls,
  Video,
  GridLayout,
} from '@andyet/simplewebrtc';


class Classroom extends React.Component{

  render(){
    const { room, peers, localMedia, remoteMedia } = this.props;
    const remoteVideos = remoteMedia.filter(media => media.kind === 'video');
    const localVideo = localMedia.filter(media => media.kind === 'video' && media.shared);

    return (
      <div className="screenContainer">
        <h1>{room.providedName}</h1>
        <span>Total people in classroom: {peers.length}</span>
        <div>
        <div className="screen">
          <GridLayout   
            className='videoGrid'    
            items={[...localVideo, ...remoteVideos]}          /* renders videos in a list */
            renderCell={(item) =>  {
              console.log(item)
              return (<Video media={item}/>)
            }}
          />
        </div> 
        <div className="menuIcon">
        <UserControls 
          render={({ isMuted, mute, unmute }) => {
            return <IconButton id='muteButton' onClick={() => isMuted? unmute() : mute()}>{isMuted? <Mic></Mic> : <MicOff></MicOff>}</IconButton>
          }}
        />
        </div>
        </div>
      </div>
    )
  }
}


export default Classroom