import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: User[] = []

const reducer = (state: User[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETCONNECTEDUSERS:
      return action.connectedUsers
    default:
      return state
  }
}

export default reducer