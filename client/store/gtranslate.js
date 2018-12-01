const translate = require('translate');
// const googleKey = require('../../server/env').apiKey;

translate.engine = 'google';
// translate.key = googleKey ;
translate.key = process.env.apiKey

const initialState = {
  lngFromIdx: 0,
  speakingLng: 'en',
  translateLng: '',
  lngToIdx: 0
};

const LNG_FROM = 'LNG_FROM';
const LNG_TO = 'LNG_TO';

export const lngFrom = (lng, idx) => ({
  type: LNG_FROM,
  idx,
  lng
});

export const lngTo = (lng, idx) => ({
  type: LNG_TO,
  lng,
  idx
})

export const _translate = (text, from, to) => async dispatch => {
   const newText = await translate(text, { from, to });
   const action = addChat(newText);
   dispatch(action);
}


export const gTranslateReducer = (state=initialState, action) => {
  switch (action.type){
  	case LNG_FROM:
  	  return {
  	  	...state,
  	  	speakingLng: action.lng,
  	  	lngFromIdx: action.idx
  	  }

  	case LNG_TO:
  	  return {
  	  	...state,
  	  	translateLng: action.lng,
  	  	lngToIdx: action.idx
  	  }

  	default:
  	  return state;
  }
}