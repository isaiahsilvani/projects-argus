import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: [] = []

const reducer = (state: [] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.USERANSWERS:
      return action.useranswers
    default:
      return state
  }
}

export default reducer