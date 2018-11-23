import React from 'react'
import { RemoteAudioPlayer, RequestUserMedia, Room }  from '@andyet/simplewebrtc'

import Classroom from './Classroom'

class Video extends React.Component{
  constructor(){
    super()
    this.state = {              /* Maybe set up a toggle for turning on and off media stream */
      mediaOn: false
    }           
    // this.toggleMedia = this.toggleMedia.bind(this)
  }
  // toggleMedia(){
  //   this.setState({
  //     mediaOn: !this.state.mediaOn
  //   })
  // }
  render(){
    const { mediaOn } = this.state
    return (
      <div>
        <RequestUserMedia audio video auto/>    {/* set up a toggle later */}
        <Room name='ROOM_NAME'>
        {
          ({room, peers, localMedia, remoteMedia}) => {
            // console.log(room)
            // console.log(peers)
            // console.log(localMedia)
            // console.log(remoteMedia)
            return <Classroom room={room} peers={peers} localMedia={localMedia} remoteMedia={remoteMedia}/>
          }
        }
        </Room>
      </div>
    )
  }
}

export default Video