import { ActionType } from '../action-types/index'
import { Action } from '../actions/index'

const initialState = false

const reducer = (state: boolean = initialState, action: Action) => {
  console.log('loading reducer hit!!!')
  switch (action.type){
    case ActionType.LOADING:
      console.log('loading reducer hit, set to state: ', action.loading)
      return action.loading
    default:
      console.log('return loading state reducer')
      return state
  }
}

export default reducer