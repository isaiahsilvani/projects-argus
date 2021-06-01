import { SocketConstructorOpts } from 'net';
import React, { useEffect, useState} from 'react'
import io, { Socket } from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'



const Chatroom: React.FC = () => {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[])

  const socket = io("http://localhost:1337")

  useEffect(() => {
    if(socket){

      socket.on("username-taken", () => {
        toast.error("Username is taken")
      })

      socket.on("username-submitted", () => {
        setConnected(true)
      })

      socket.on("get-connected-users", (connectedUsers: {id: string, username: string}[]) => {
        setConnectedUsers(connectedUsers.filter(user => user.username !== username))
        console.log(connectedUsers)
      })
    }
  }, [])

  const handleConnection = () => {
    if(socket){
      socket.emit("handle-connection")
    }
  }

  return (
    <div className="chatroom">
      CHATROOM HERE
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Chatroom