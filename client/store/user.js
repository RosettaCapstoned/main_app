import axios from 'axios';

// state
const initialState = {};

// constants
const CREATE_USER = 'CREATE_USER';

// action creators
const createUser = userInfo => ({
  type: CREATE_USER,
  userInfo
})

// thunk creators
export const _createUser = userInfo => async dispatch => {
	try{
	  const response = await axios.post('/api/users', userInfo)
	  const user = response.data;
	  const action = createUser(resp.data);
	  dispatch(action)
    } catch(ex) { console.log(ex) }
}

// reducer
export const userReducer = (state=initialState, action) => {
	switch (action.type){
	  case CREATE_USER:
	    return state = action.userInfo
	  default:
	    return state;
	}
}