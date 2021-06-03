import { ActionType } from '../action-types'

interface SetUsernameAction {
  type: ActionType.SETUSERNAME,
  username: string
}

interface SetConnectedAction {
  type: ActionType.SETCONNECTED,
  connected: boolean
}

interface setConnectedUsersAction {
  type: ActionType.SETCONNECTEDUSERS,
  connectedUsers: {id: string, username: string}[]
}

interface setMessagesAction {
  type: ActionType.SETMESSAGES,
  messages: {message: string, username: string}[]
}

interface setCurrent {
  type: ActionType.SETCURRENT,
  current: boolean
}

interface clearMessages {
  type: ActionType.CLEARMESSAGES
}

export type Action = SetUsernameAction | setConnectedUsersAction | SetConnectedAction | setMessagesAction | setCurrent | clearMessages