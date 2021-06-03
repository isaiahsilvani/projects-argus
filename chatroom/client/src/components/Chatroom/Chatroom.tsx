
import React, { useEffect, useState} from 'react'
import io from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'
import EnterUsername from '../EnterUsername/EnterUsername';
// for redux
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'

import { bindActionCreators } from 'redux';
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers';
import Messages from '../Messages/Messages';




const Chatroom: React.FC = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const { setConnected, setConnectedUsers, SetMessages } = bindActionCreators(actionCreators, dispatch)
  // redux state
  const user = useSelector((store: State) => store.username)
  const connected = useSelector((store: State) => store.connected)
  const current = useSelector((store: State) => store.current)
  const messages = useSelector((store: State) => store.messages)

  // state for input fields
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  let socket = io("http://localhost:1338")

  useEffect(() => {
    
      socket.on("username-taken", () => {
        toast.error("Username is taken")
      })

      socket.on("username-submitted", () => {
        setConnected(true)
      })

      socket.on("get-connected-users", (connectedUsers: {id: string, username: string}[]) => {
        setConnectedUsers(connectedUsers.filter(user => user.username !== username))
      })

      socket.on("recieve-message", ({message, username}) => {
        
        const messageFormat = {
          username: username,
          message: message
        }
        // create Message in database with API as well as storing in state
        SetMessages([...messages, messageFormat])
      })
  }, [])

  const handleConnection = () => {
      console.log('handle connection hit', username)
      socket.emit("handle-connection", username)
  }

  const handleSendMessage = () => {
    console.log('handle send hit')
    socket.emit("message", {message, username})
    setMessage("")
  }

  console.log(user)

  return (
    <div className="chatroom">
      CHATROOM HERE
      {user}
      {
        (!connected || !current) &&
        <EnterUsername 
          handleConnection={handleConnection} 
          setUser={setUsername}
          username={username}
          />
      }

      {
        (connected && current) &&
        <>
          <ConnectedUsers/>
          <Messages 
            message={message}
            setMessage={setMessage} 
            handleSendMessage={handleSendMessage}/>
        </>
      }
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Chatroom