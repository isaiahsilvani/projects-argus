import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState: AnswerObject[] = []

const reducer = (state: AnswerObject[] = initialState, action: Action) => {
  switch (action.type){
    case ActionType.USERANSWERS:
      return action.useranswers
    default:
      return state
  }
}

export default reducer