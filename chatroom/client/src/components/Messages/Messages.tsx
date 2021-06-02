import React from 'react'
import { useSelector } from 'react-redux'

interface MessagesProps {
  message: string,
  setMessage: any,
  handleSendMessage: any
}

const Messages: React.FC<MessagesProps> = ({ message, setMessage, handleSendMessage }) => {


    const messages = useSelector((store: State) => store.messages)

    return (
      <div className="messages">
      <li className="message-list scrollable">
        {messages.map((message: Message, idx: number) => (
          <div key={idx}>
            <p>{message.message}</p>
            <p>{message.username}</p>
          </div>
        ))}
      </li>

      <form onSubmit={e => {
        e.preventDefault()

        handleSendMessage()
      }}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={message}
          onChange={e => setMessage(e.target.value)} 
          />
        <button type='submit'>Send</button>
      </form>
    </div>
    );
}

export default Messages