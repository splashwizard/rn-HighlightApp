import { combineReducers } from 'redux'
import userReducer from './userReducer'
import threadReducer from './threadReducer'

export default combineReducers({
    user: userReducer,
    thread: threadReducer
});