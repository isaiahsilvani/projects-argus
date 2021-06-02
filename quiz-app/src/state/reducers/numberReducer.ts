import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = 1

const reducer = (state: number = initialState, action: Action) => {
  switch (action.type){
    case ActionType.NUMBER:
      return action.number
    default:
      return state
  }
}

export default reducer