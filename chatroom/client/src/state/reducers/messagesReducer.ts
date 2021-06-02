import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'
// store message inside database
import * as api from '../../services/message-api'

let initialState: Message[] = []

const reducer = (state: Message[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETMESSAGES:
      console.log("state: ", state, "messages: ", action.messages)
      api.saveMsgRequest(action.messages)
      return state.concat(action.messages)
    default:
      return state
  }
}

export default reducer