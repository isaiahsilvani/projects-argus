import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: Question[] = []

const reducer = (state: Question[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.QUESTIONS:
      return action.questions
    default:
      return state
  }
}

export default reducer