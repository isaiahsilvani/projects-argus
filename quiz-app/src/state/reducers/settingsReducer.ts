// amount: number, difficulty: string
import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = {amount: 10, difficulty: 'easy'}

const reducer = (state: {amount: number, difficulty: string} = initialState, action: Action) => {
  switch (action.type){
    case ActionType.SETTINGS:
      return action.settings
    default:
      return state
  }
}

export default reducer