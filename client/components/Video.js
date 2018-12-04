import React from 'react'
import { connect } from 'react-redux';
import { RequestUserMedia, Room }  from '@andyet/simplewebrtc'
import { CircularProgress } from '@material-ui/core';

import SocketSingleton from '../utils/SocketSingleton'

import Classroom from './Classroom'

const socket = new SocketSingleton().socket

class Video extends React.Component{
  render(){
    const { auth, teacherStreamId } = this.props
    return (
      <div className="video">
        <RequestUserMedia audio video auto/>    {/* set up a toggle later */}
        <Room name='ROOM_NAME'>
        {
          ({room, peers, localMedia, remoteMedia}) => {
            // console.log(remoteMedia)
            let remoteVideos = remoteMedia.filter(media => media.kind === 'video');
            if(auth.role === 'Student'){
              remoteVideos = remoteVideos.filter((video) => video.id === teacherStreamId)
            }
            
            console.log(remoteVideos)
            if(!room.joined){
              return <CircularProgress />
            }
            return (
              <Classroom 
                room={room} 
                peers={peers} 
                localMedia={localMedia} 
                remoteVideos={remoteVideos}
              />)
          }
        }
        </Room>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, teacherStreamId }) => {
	return {
    auth,
    teacherStreamId
	}
}

export default connect(mapStateToProps, null)(Video)