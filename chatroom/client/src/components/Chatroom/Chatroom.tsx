import { SocketConstructorOpts } from 'net';
import React, { useEffect, useState} from 'react'
import io, { Socket } from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'
import EnterUsername from '../EnterUsername/EnterUsername';
// for redux
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../../state/store'
import { bindActionCreators } from 'redux';


const Chatroom: React.FC = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const { setConnected, setConnectedUsers } = bindActionCreators(actionCreators, dispatch)
  // redux state
  const user = useSelector((store: State) => store.username)
  const connected = useSelector((store: State) => store.connected)
  const users = useSelector((store: State) => store.connectedUsers)
  console.log('username here', user)

  const [username, setUsername] = useState("")

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
        <div>
          Connected!!
        </div>
      }
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Chatroom