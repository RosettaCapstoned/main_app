import io from 'socket.io-client';
import store, { dispatch } from '../store';
import { sendMessage, receiveMessage } from '../store/message';
import { receiveSpeechText } from '../store/speechText';
import { addStreamId } from '../store/teacherStreamId'

let conn = null;
let state = store.getState();
let { lngFrom, lngTo } = state.translation;
const roomId = 'default';

console.log('languages are: ', lngFrom, lngTo);

console.log('SocketSingleton state is: ', state);

store.subscribe(() => {
  // console.log('state was updated: ', state);
  let newState = store.getState();
  if (newState.translation != state.translation) {
    state = newState;
    lngTo = state.translation.lngTo;
    lngFrom = state.translation.lngFrom;
    conn.emit('roomSettings', { lng: lngTo });
    conn.emit('roomSettings', { lng: lngFrom });
  }
});

//Identify Room

const _sendMessage = (name, message, languageSetting) => {
    dispatch(sendMessage({ name, message, languageSetting }));
    socket.emit('message', { name, message, languageSetting });
  },
  _receiveMessage = message => dispatch(sendMessage({ message }));

const _receiveSpeechText = speechText =>
  dispatch(receiveSpeechText(speechText));

class SocketSingleton {
  constructor() {
    // PopStateEvent
    // console.log('SocketSingleton called with: ', state);
    // console.log(window.location.origin)
    if (!conn) {
      conn = io(window.location.origin);

      conn.on('connect', () => {
        // console.log(conn.id)

        conn.on('joined', ({ message }) => {
          console.log('user joined: ', message);
        });

        conn.on('socketId', id => {
          console.log('SocketId received ', id);
          //Set SocketId on User instance
          const roomId = 'default';
          const lng = lngTo;
          conn.emit('roomSettings', { lng });
        });

        conn.on('message', msg => {
          console.log('message is: ', msg);
          let { name, message } = msg;
          //hardcoding language for initial testing
          message = message[lngTo];
          console.log('message received: ', message);
          _receiveMessage({ message, name });
        });

        conn.on('joinChat', () => {});

        conn.on('teacherSpeech', speechText => {
          let { name, message } = speechText;
          message = message[lngTo];
          _receiveSpeechText(message);
        });

        conn.on('teacher-stream', teacherStreamId => {
          console.log('Teacher ID:', teacherStreamId)
          store.dispatch(addStreamId(teacherStreamId))
        });
        conn.on('student-stream', studentStreamId => {
          console.log('Student ID:', studentStreamId)
          const { auth, teacherStreamId } = store.getState()  //look into simplewebrtc
          if(auth.role === 'Teacher'){   //if this hits then we emit the teacherStreamId again
            conn.emit('teacherStreamId', { teacherStreamId })
          }
         
        });
      });
    }
    this.socket = conn;
  }
}

export default SocketSingleton;
