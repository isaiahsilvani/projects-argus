import { ActionType } from "../action-types"
import { Dispatch } from "redux"    // use Dispatch type from redux to please typescript
import { Action } from '../actions/index'

export const setUsername = (username: string) => {
  return (dispatch: Dispatch<Action>) => {
    console.log("action-creator --- user name that's being sent", username)
    dispatch({
      type: ActionType.SETUSERNAME,
      username
    })
  }
}