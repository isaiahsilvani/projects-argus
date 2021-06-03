import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: UserScore[] = []

const reducer = (state: UserScore[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.GETUSERSCORES:
      return action.userscores
    default:
      return state
  }
}

export default reducer