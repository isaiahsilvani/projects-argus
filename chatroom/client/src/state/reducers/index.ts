import { combineReducers } from 'redux'
import usernameReducer from './usernameReducer'
import connectedReducer from './connectedReducer'
import connectedUsersReducer from './connectedUsersReducer'
import messagesReducer from './messagesReducer'
import currentReducer from './currentReducer'
import clickedReducer from './clickedReducer'

const reducers = combineReducers({
  username: usernameReducer,
  connected: connectedReducer,
  connectedUsers: connectedUsersReducer,
  messages: messagesReducer,
  current: currentReducer,
  clicked: clickedReducer
})

export default reducers
// define State Type, this exactly interprets what we want
export type State = ReturnType<typeof reducers>
// interpret whatever type we pass in traingle brackets