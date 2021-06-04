
import React, { useEffect, useState} from 'react'
import { io } from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'
import EnterUsername from '../EnterUsername/EnterUsername';
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers';
import Messages from '../Messages/Messages';
import { ChatroomBlock } from './Chatroom.css.js'

const Chatroom: React.FC = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const { setConnected, setConnectedUsers, SetMessages } = bindActionCreators(actionCreators, dispatch)
  // redux state
  const connected = useSelector((store: State) => store.connected)
  const current = useSelector((store: State) => store.current)
  const messages = useSelector((store: State) => store.messages)
  const clicked = useSelector((store: State) => store.clicked)

  // state for input fields
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const ENDPOINT = "http://localhost:1338"

  const socket = io(ENDPOINT, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 99999
})

  useEffect(() => {
      if(username === ""){
        setConnected(false)
      }

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
        // if this message BELONGS TO THE CURRENT USER TO AVOID DUPLICATE SOCKET DATA STORAGE
        // create Message in database with API as well as storing in state
        console.log('messages to check: ', messages)
        console.log('current message: ', messageFormat)
        console.log(message.length === 0)
          SetMessages([...messages, messageFormat])
      })
  }, [ENDPOINT])

  const handleConnection = () => {
      console.log('socket, you better emit!!')
      socket.emit("handle-connection", username)
  }

  const handleSendMessage = () => {
    console.log('set clicked was triggered..... ', clicked)
    socket.emit("message", {message, username})
    setMessage("")
  }

  return (
    <ChatroomBlock>
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
    </ChatroomBlock>
  );
}

export default Chatroom