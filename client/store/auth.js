import axios from 'axios';

const SET_AUTH = 'SET_AUTH';

const _setAuth = auth => ({
  type: SET_AUTH,
  auth,
});

const exchangeTokenForAuth = history => async dispatch => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return;
    }
    try {
    const response = await axios.get('/api/auth', { headers: { authorization: token, } })
    const auth = response.data;
    const action = _setAuth(auth);
    dispatch(action);
    //Things you should do when user first logs
    //Auth object is now in the Redux Store and can be accessed on any connected component
    // I.E. dispatch a thunk to load user data
    if (history) history.push('/');
    } 
    catch(ex) {
      console.log(ex);
      window.localStorage.removeItem('token');
    }
};

const logout = () => {
    window.localStorage.removeItem('token');
    return _setAuth({});
};

const login = (credentials, history) => async dispatch => {
  // console.log(credentials);
    const response = await axios.post('/api/auth', credentials)
    const data = response.data;
    window.localStorage.setItem('token', data.token);
    const action = exchangeTokenForAuth(history);
    dispatch(action);
};

const signUp = (credentials, history) => {
  // console.log(credentials)
  return async dispatch => {
    const response = await axios.post('/api/auth/signup', credentials)
    return dispatch(login(response.data, history))
  }

}

const authReducer = (state = {}, action) => {
    if (action.type === SET_AUTH) {
      state = action.auth;
    }
    return state;
};

export { authReducer, login, logout, signUp, exchangeTokenForAuth };