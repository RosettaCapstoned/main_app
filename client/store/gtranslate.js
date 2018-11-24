const translate = require('translate');

const initialState = {
  selectedIdx: 0,
  speakingLng: 'en',
  translateLng: ''
};

const LNG_SELECT = 'LNG_SELECT';

export const lngSelect = (lng, idx) => ({
  type: LNG_SELECT,
  idx,
  lng
});

export const gTranslateReducer = (state=initialState, action) => {
  switch (action.type){
  	case LNG_SELECT:
  	  return {
  	  	...state,
  	  	speakingLng: action.lng,
  	  	selectedIdx: action.idx
  	  }
  	default:
  	  return state;
  }
}