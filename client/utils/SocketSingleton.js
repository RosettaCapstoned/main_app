import io from 'socket.io-client';
import store, { dispatch } from '../store';
import { sendMessage, receiveMessage } from '../store/message';

let conn = null;

//Identify Room 

const _sendMessage = (name, message, languageSetting) => {
    dispatch(sendMessage({name, message, languageSetting}));
    socket.emit('message', {name, message, languageSetting});
},
_receiveMessage = (message) => dispatch(sendMessage({ message }))


class SocketSingleton {
    constructor(){
        // console.log(window.location.origin)
        if (!conn) {
            conn = io(window.location.origin);

            conn.on('connect', () => {
                // console.log(conn.id)

                conn.on('joined', ({ message })=> {
                    console.log('user joined: ', message);
                });
        
                conn.on('socketId', id => {
                    console.log('SocketId received ', id)
                    //Set SocketId on User instance
                    const roomId = 'default';
                    const lng = 'en';
                    conn.emit('roomSettings', ({ roomId, lng }));
                });

                conn.on('message', (msg)=> {
                    console.log('message is: ', msg);
                    let { name, message } = msg;
                    //hardcoding language for initial testing
                    message = message['es'];
                    console.log('message received: ', message);
                    _receiveMessage({message, name});
                });
        
                conn.on('joinChat', ()=> {
        
                });

                conn.on('teacher-stream', teacherStreamId => {
                    //will be used to filter video
                });
                conn.on('student-stream', studentStreamId => {
                    //will be used to tell which students are logged in
                });
            });
        }
        this.socket = conn;
    }
}

export default SocketSingleton;