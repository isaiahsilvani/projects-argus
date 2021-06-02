import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as api from '../../services/message-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';

interface MessagesProps {
  message: string,
  setMessage: any,
  handleSendMessage: any
}

const Messages: React.FC<MessagesProps> = ({ message, setMessage, handleSendMessage }) => {

    const dispatch = useDispatch()
    const { SetMessages } = bindActionCreators(actionCreators, dispatch)

    const messages = useSelector((store: State) => store.messages)

    useEffect(() => {
      api.getMsgsRequest()
      .then(data => {
        console.log('set this data', data)
        if (data){ SetMessages(data) }
      })
    }, []);

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