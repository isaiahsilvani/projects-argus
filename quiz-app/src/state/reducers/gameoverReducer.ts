import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = true

const reducer = (state: boolean = initialState, action: Action) => {
  switch (action.type){
    case ActionType.GAMEOVER:
      return action.gameover
    default:
      return state
  }
}

export default reducer