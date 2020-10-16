import _ from 'lodash'

import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types'

// Instead of using an array-based reducer, we use an object-based reducer
// The keys on the object will be 'id's of streams, and the values will be the stream-details
// Using object-based reducer will help us update our stream with much easier code
// Key-interpolation -> We set-up our key-value pair using { [key_name]: value }
export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_STREAM: return {...state, [action.payload.id]: action.payload}
    // mapKeys -> takes an array and a property of a single entity of the array, 
    // and uses it as a key, 
    // with values being the same entities as of the array, 
    // and returns resultant object
    case FETCH_STREAMS: return {...state, ..._.mapKeys(action.payload, 'id')}
    case CREATE_STREAM: return {...state, [action.payload.id]: action.payload }
    case EDIT_STREAM: return {...state, [action.payload.id]: action.payload }
    case DELETE_STREAM: return _.omit(state, action.payload)
    default: return state
  }
}