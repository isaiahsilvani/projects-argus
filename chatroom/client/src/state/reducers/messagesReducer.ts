import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'
// store message inside database
import * as api from '../../services/message-api'

let initialState: Message[] = []

const reducer = (state: Message[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETMESSAGES:
      console.log("state: ", state, "messages: ", action.messages)
      console.log('---- message reducer save/set message action ----', action.messages)
      api.saveMsgRequest(action.messages)
      return state.concat(action.messages)
    case ActionType.CLEARMESSAGES:
      console.log('****** clear messages')
      return []
    case ActionType.GETMESSAGES:
      console.log('^^^^ GET MESSAGE in messagesReducer')
      return action.messages
    default:
      console.log("@@@ DEFAULT RETURN STATE MESSAGE REDUCER")
      return state
  }
}

export default reducer