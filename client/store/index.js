import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { authReducer } from './auth';
import { userReducer } from './user';
import { messageReducer } from './message';
import { gTranslateReducer } from './gtranslate';
import { speechTextReducer } from './speechText';
import swrtcReducer from '../../node_modules/@andyet/simplewebrtc/reducers/';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  translation: gTranslateReducer,
  simplewebrtc: swrtcReducer,
  message: messageReducer,
  speechText: speechTextReducer,
});

const initial = {
  simplewebrtc: {},
  translation: {},
  auth: {},
  message: [],
  speechText: {
    prevMessage: '',
    currMessage: '',
    messageLog: [],
  },
};

const store = createStore(reducer, initial, applyMiddleware(thunk));

export default store;
