import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: Message[] = []

const reducer = (state: Message[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETMESSAGES:
      console.log("state: ", state, "messages: ", action.messages)
      return state.concat(action.messages)
    default:
      return state
  }
}

export default reducer