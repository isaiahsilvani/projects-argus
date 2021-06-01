import { combineReducers } from 'redux'
import usernameReducer from './usernameReducer'

const reducers = combineReducers({
  username: usernameReducer
})

export default reducers
// define State Type, this exactly interprets what we want
export type State = ReturnType<typeof reducers>
// interpret whatever type we pass in traingle brackets