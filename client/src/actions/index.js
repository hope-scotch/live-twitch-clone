import streams from '../apis/streams'
import history from '../history'
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM, 
  DELETE_STREAM,
  EDIT_STREAM
} from './types'

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth // This is why we extracted out the auth logic onto a global Redux store
  // Note: auth has 2 properties: isSignedIn, userId

  const response = await streams.post('/streams', { ...formValues, userId }) // post req with axios

  dispatch({ type: CREATE_STREAM, payload: response.data })

  // Do some programmatic navigation to get the user back to the root route
  // Programmatic Navigation -> Without manual user interaction
  history.push('/')
}

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams')
  
  dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`)

  dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const editStream = (id, formValues) => async dispatch => {
  // PUT: Update ALL properties of a record (Overwrites)
  // PATCH: Update SOME properties of a record (Merges)
  // 'id' property is immune to this difference
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data })
  history.push('/')
}

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`)

  dispatch({ type: DELETE_STREAM, payload: id })
  history.push('/')
}