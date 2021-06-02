import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = 0

const reducer = (state: number = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SCORE:
      return action.score
    default:
      return state
  }
}

export default reducer