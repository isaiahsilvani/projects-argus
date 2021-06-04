
import React, { useEffect, useState} from 'react'
import io from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'
import EnterUsername from '../EnterUsername/EnterUsername';
// for redux
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import * as api from '../../services/message-api'
import { bindActionCreators } from 'redux';
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers';
import Messages from '../Messages/Messages';
import styled from '@emotion/styled'

const ChatroomBlock = styled.div`
  background-color: lightblue;
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: 
  "chat users"
`



const Chatroom: React.FC = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const { setConnected, setConnectedUsers, SetMessages, ClearMessages, setClicked } = bindActionCreators(actionCreators, dispatch)
  // redux state
  const user = useSelector((store: State) => store.username)
  const connected = useSelector((store: State) => store.connected)
  const current = useSelector((store: State) => store.current)
  const messages = useSelector((store: State) => store.messages)
  const clicked = useSelector((store: State) => store.clicked)

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
        // if this message BELONGS TO THE CURRENT USER TO AVOID DUPLICATE SOCKET DATA STORAGE
        // create Message in database with API as well as storing in state
        console.log(' set messages, does username === user? ', messageFormat.username === username)
        console.log('message username: ', messageFormat.username, "current user: ", username)
        console.log('clicked conditional statement here folks... ', clicked)
        if (clicked) { 
          setClicked(false)
          console.log('set clicked set to false agagin.... ', clicked)
          SetMessages([...messages, messageFormat])
        }
        
      })
  }, [])

  const handleConnection = () => {
      socket.emit("handle-connection", username)
  }

  const handleSendMessage = () => {
    setClicked(true)
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