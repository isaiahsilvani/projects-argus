import { SocketConstructorOpts } from 'net';
import React, { useEffect, useRef} from 'react'
import io, { Socket } from 'socket.io-client'



const Chatroom: React.FC = () => {
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