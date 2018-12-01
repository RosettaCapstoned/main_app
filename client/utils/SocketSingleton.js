import io from 'socket.io-client';

let conn = null;

//Identify Room 

class SocketSingleton {
    constructor(){
        console.log(window.location.origin)
        if (!conn) {
            conn = io(window.location.origin);
            conn.on('connect', () => {
                console.log(conn.id)
                conn.on('teacher-stream', teacherStreamId => {
                    //will be used to filter video
                })
                conn.on('student-stream', studentStreamId => {
                    //will be used to tell which students are logged in
                })
            })
        }
        this.socket = conn;
    }
}

export default SocketSingleton;