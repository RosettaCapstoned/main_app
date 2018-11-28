import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App.js';
import * as SWRTC from '@andyet/simplewebrtc'

const API_KEY = 'ab446ae790d628e3b493ef90';

const ROOM_NAME = 'YOUR_ROOM_NAME';   //will change name based on teacher's id
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD'; //same with password
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`

// console.log(SWRTC.createStore().getState())

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
)
