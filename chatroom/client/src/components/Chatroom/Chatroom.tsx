import { SocketConstructorOpts } from 'net';
import React, { useEffect, useState} from 'react'
import io, { Socket } from 'socket.io-client'



const Chatroom: React.FC = () => {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[])


  const socket = io("http://localhost:1337")

  useEffect(() => {
    
  }, []);

    return (
      <div className="chatroom">
        CHATROOM HERE
      </div>
    );
}

export default Chatroom