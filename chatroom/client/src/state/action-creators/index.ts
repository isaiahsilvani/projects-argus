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

export const setConnected = (connected: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    console.log("action-creator --- connected bool. that's being sent", connected)
    dispatch({
      type: ActionType.SETCONNECTED,
      connected
    })
  }
}

export const setClicked = (clicked: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SETCLICKED,
      clicked
    })
  }
}

export const setCurrent = (current: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    console.log("action-creator --- connected bool. that's being sent", current)
    dispatch({
      type: ActionType.SETCURRENT,
      current
    })
  }
}

export const setConnectedUsers = (connectedUsers: {id: string, username: string}[]) => {
  return (dispatch: Dispatch<Action>) => {
    console.log("action-creator --- connected bool. that's being sent", connectedUsers)
    dispatch({
      type: ActionType.SETCONNECTEDUSERS,
      connectedUsers
    })
  }
}

export const SetMessages = (messages: {message: string, username: string}[]) => {
  return (dispatch: Dispatch<Action>) => {
    console.log("action-creator --- connected bool. that's being sent", messages)
    dispatch({
      type: ActionType.SETMESSAGES,
      messages
    })
  }
}

export const ClearMessages = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLEARMESSAGES,
    })
  }
}

export const GetMessages = (messages: {message: string, username: string}[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GETMESSAGES,
      messages
    })
  }
}