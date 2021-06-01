import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: Message[] = []

const reducer = (state: Message[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETMESSAGE:
      return action.messages
    default:
      return state
  }
}

export default reducer