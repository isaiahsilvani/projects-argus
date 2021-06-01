import { SocketConstructorOpts } from 'net';
import React, { useEffect, useState} from 'react'
import io, { Socket } from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'
import EnterUsername from '../EnterUsername/EnterUsername';
// for redux
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'

import { bindActionCreators } from 'redux';
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers';


const Chatroom: React.FC = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const { setConnected, setConnectedUsers } = bindActionCreators(actionCreators, dispatch)
  // redux state
  const user = useSelector((store: State) => store.username)
  const connected = useSelector((store: State) => store.connected)
  const messages2 = useSelector((store: State) => store.messages)
  console.log(messages2)
  console.log('username here', user)

  // state for input fields
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  let socket = io("http://localhost:1337")

  useEffect(() => {
    
      socket.on("username-taken", () => {
        console.log('username tekn clientside')
        toast.error("Username is taken")
      })

      socket.on("username-submitted", () => {
        console.log('username submitted client')
        setConnected(true)

      })

      socket.on("get-connected-users", (connectedUsers: {id: string, username: string}[]) => {
        setConnectedUsers(connectedUsers.filter(user => user.username !== username))
        console.log(connectedUsers)
      })
  }, [])

  const handleConnection = () => {
      console.log('handle connection hit', username)
      socket.emit("handle-connection", username)
  }

  return (
    <div className="chatroom">
      CHATROOM HERE
      {user}
      {
        !connected &&
        <EnterUsername 
          handleConnection={handleConnection} 
          setUser={setUsername}
          username={username}
          />
      }

      {
        connected &&
          <ConnectedUsers/>
      }
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Chatroom