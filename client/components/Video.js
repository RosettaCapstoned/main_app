import React from 'react'
import { connect } from 'react-redux';
import { RequestUserMedia, Room }  from '@andyet/simplewebrtc'
import { CircularProgress } from '@material-ui/core';

import SocketSingleton from '../utils/SocketSingleton'

import Classroom from './Classroom'

const socket = new SocketSingleton().socket

class Video extends React.Component{
  render(){
    const { auth } = this.props
    return (
      <div className="video">
        <RequestUserMedia audio video auto/>    {/* set up a toggle later */}
        <Room name='ROOM_NAME'>
        {
          ({room, peers, localMedia, remoteMedia}) => {
            if(!room.joined){
              return <CircularProgress />
            }
            return (
              <Classroom 
                room={room} 
                peers={peers} 
                localMedia={localMedia} 
                remoteMedia={remoteMedia}
              />)
          }
        }
        </Room>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(Video)