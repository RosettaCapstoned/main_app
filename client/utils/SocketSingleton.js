import socket from 'socket.io-client';

let conn = null;

//Identify Room 

class SocketSingleton {
    constructor() {
        if (!conn) {
            conn = socket();
        }
        this.socket = conn;
    }
}

export default SocketSingleton;