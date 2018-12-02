
const ADD_STREAM_ID = 'ADD_STREAM_ID'

export const addStreamId = streamId => ({ type: ADD_STREAM_ID, streamId })

const teacherStreamIdReducer = (state = '', action) => {
  switch(action.type){
    default:
      return state
    case ADD_STREAM_ID:
      return action.streamId
  }
}
export default teacherStreamIdReducer