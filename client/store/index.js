import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { gTranslateReducer } from './gtranslate';
import swrtcReducer from '../../node_modules/@andyet/simplewebrtc/reducers/'

const reducer = combineReducers({
  translation: gTranslateReducer,
  webrtc: swrtcReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;