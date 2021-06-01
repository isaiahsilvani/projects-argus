import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = ""

const reducer = (state: string = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETUSERNAME:
      return action.username
    default:
      return state
  }
}

export default reducer