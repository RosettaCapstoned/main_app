// state
const initialState = [];

// constants
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const SEND_MESSAGE = 'SEND_MESSAGE'

// action creators
const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
})

const sendMessage = message => ({
    type: SEND_MESSAGE,
    message
})

// reducer
const messageReducer = (state=initialState, action) => {
	switch (action.type){
      case RECEIVE_MESSAGE:
        console.log('receive message dispatch')
	    return state = [ ...state, action.message ];
      case SEND_MESSAGE:
        return state = [ ...state, action.message ];
      default:
        return state;
        
	}
};

export { messageReducer, 
        sendMessage,
        receiveMessage
        };