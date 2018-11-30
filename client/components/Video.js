import React from 'react'
import { connect } from 'react-redux';
import { RequestUserMedia, Room }  from '@andyet/simplewebrtc'
import { CircularProgress } from '@material-ui/core';

import Classroom from './Classroom'

class Video extends React.Component{
  render(){
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

export default Video