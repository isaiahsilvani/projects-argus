import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = false

const reducer = (state: boolean = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETCLICKED:
      return action.clicked
    default:
      return state
  }
}

export default reducer