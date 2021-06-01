import { SocketConstructorOpts } from 'net';
import React, { useEffect, useState} from 'react'
import io, { Socket } from 'socket.io-client'
import { toast, ToastContainer } from 'react-toastify'



const Chatroom: React.FC = () => {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[])

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
      {
        !connected &&
          <>
            <form onSubmit={e => {
              e.preventDefault()
              handleConnection()
            }}>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username..." />
              <button type='submit'>Submit</button>
            </form>
          </>
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