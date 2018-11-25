const translate = require('translate');
const googleKey = require('../../server/env').apiKey;

translate.engine = 'google';
translate.key = googleKey;

let initialState = {
  selectedIdx: 0,
  speakingLng: 'en',
  translateLng: '',
  input: '',
  chatbox: ['Start typing..']
};

const LNG_SELECT = 'LNG_SELECT';
const INPUT = 'INPUT';
const ADD_CHAT = 'ADD_CHAT';

export const lngSelect = (lng, idx) => ({
  type: LNG_SELECT,
  idx,
  lng
});

export const inputMsg = text => ({
  type: INPUT,
  text
})

export const addChat = msg => ({
  type: ADD_CHAT,
  msg
})

export const _translate = (text, from, to) => async dispatch => {
   const newText = await translate(text, { from, to });
   const action = addChat(newText);
   dispatch(action);
}


export const gTranslateReducer = (state=initialState, action) => {
  switch (action.type){
  	case LNG_SELECT:
  	  return {
  	  	...state,
  	  	speakingLng: action.lng,
  	  	selectedIdx: action.idx
  	  }

  	case INPUT:
  	  return {
  	  	...state,
  	  	input: action.text
  	  }

  	case ADD_CHAT:
  	console.log(state.chatbox, action.msg)
  	  return {
  	  	...state,
  	  	chatbox: [...state.chatbox, action.msg]
  	  }

  	default:
  	  return state;
  }
}