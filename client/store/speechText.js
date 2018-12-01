// state
const initialState = {
  prevMessage: '',
  currMessage: '',
};

// constants
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// action creators
const receiveSpeechText = message => ({
  type: RECEIVE_MESSAGE,
  message,
});

// reducer
const speechTextReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      console.log('receive message dispatch');
      return { prevMessage: state.currMessage, currMessage: action.message };
    default:
      return state;
  }
};

export { speechTextReducer, receiveSpeechText };
