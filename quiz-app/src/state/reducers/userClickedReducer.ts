import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = false

const reducer = (state: boolean = initialState, action: Action) => {
  console.log('userClicked reducer hit!!!')
  switch (action.type){
    case ActionType.USERCLICKED:
      return action.clicked
    default:
      console.log('return loading state reducer')
      return state
  }
}

export default reducer