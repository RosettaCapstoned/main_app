// state
const initialState = {
  prevMessage: '',
  currMessage: '',
  messageLog: [],
};

// constants
const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';

// action creators
const receiveSpeechText = speechText => ({
  type: RECEIVED_MESSAGE,
  speechText,
});

// reducer
const speechTextReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_MESSAGE:
      console.log('receive message dispatch');
      if (action.speechText !== '') {
        return {
          prevMessage: state.currMessage,
          currMessage: action.speechText,
          messageLog: [...state.messageLog, action.speechText],
        };
      }
    default:
      return state;
  }
};

export { speechTextReducer, receiveSpeechText };
