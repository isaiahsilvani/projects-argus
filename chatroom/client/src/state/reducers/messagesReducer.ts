import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'
// store message inside database

let initialState: Message[] = []

const reducer = (state: Message[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETMESSAGES:
      return state.concat(action.messages)
    case ActionType.CLEARMESSAGES:
      return []
    case ActionType.GETMESSAGES:
      return action.messages
    default:
      return state
  }
}

export default reducer