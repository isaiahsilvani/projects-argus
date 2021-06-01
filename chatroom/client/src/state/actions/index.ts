import { ActionType } from '../action-types'

interface SetUsernameAction {
  type: ActionType.SETUSERNAME,
  username: string
}

interface SetConnected {
  type: ActionType.SETCONNECTED,
  connected: boolean
}

interface setConnectedUsers {
  type: ActionType.SETCONNECTEDUSERS,
  connectedUsers: {id: string, username: string}[]
}

export type Action = SetUsernameAction | setConnectedUsers | SetConnected