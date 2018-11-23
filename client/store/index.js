import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { gTranslateReducer } from './gtranslate';
import swrtcReducer from '../../node_modules/@andyet/simplewebrtc/reducers/'

const reducer = combineReducers({
  translation: gTranslateReducer,
  simplewebrtc: swrtcReducer,
});

const initial = {
  simplewebrtc: {},
  translation: {}
}

const store = createStore(reducer, initial, applyMiddleware(logger, thunk));

export default store;