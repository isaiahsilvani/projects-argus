import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as api from '../../services/message-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import styled from '@emotion/styled'

const Column = styled.div`
  display: grid;
  background-color: white;
  grid-row: span 1;
`



const MsgsList = styled.div`
  height: 70vh;
  background-color: white;
  overflow-y: scroll;
`
const ClientMsg = styled.span`
  background-color: lightblue;
`
const OtherMsg = styled.span`
  background-color: lightpink;
`
const AdminMsg = styled.span`
  background-color: lightgrey;
`

interface MessagesProps {
  message: string,
  setMessage: any,
  handleSendMessage: any
}

const Messages: React.FC<MessagesProps> = ({ message, setMessage, handleSendMessage }) => {

    const dispatch = useDispatch()
    const { SetMessages, GetMessages, ClearMessages } = bindActionCreators(actionCreators, dispatch)

    const messages = useSelector((store: State) => store.messages)
    const current = useSelector((store: State) => store.current)
    const username = useSelector((store: State) => store.username)

    useEffect(() => {
      console.log('$$$getMsgrequest in connectedUsers comp.')
      api.getMsgsRequest()
      .then(data => {
        GetMessages(data)
      })
    }, []);

    const handleKeyPress = (e: any) => {
      if(e.key === 'Enter'){
        handleSendMessage()
      }
    }



    return (
      <Column>
        <MsgsList>
          <li className="message-list scrollable">
            {messages.length === 0 && <p>...</p>}
            {messages.map((message: Message, idx: number) => (
              <div key={idx}>
                {message.username === username &&
                 <div>
                  <ClientMsg>{message.username}</ClientMsg>
                  <ClientMsg>{message.message}</ClientMsg>
                </div>}
                {message.username === "admin" &&
                 <>
                 <AdminMsg>{message.username}</AdminMsg>
                 <AdminMsg>{message.message}</AdminMsg>
                </>}
                {(message.username !== username || "admin") &&
                 <>
                 <OtherMsg>{message.username}</OtherMsg>
                 <OtherMsg>{message.message}</OtherMsg>
                </>}
              </div>
            ))}
          </li>
        </MsgsList>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={message}
          onChange={e => setMessage(e.target.value)} 
          onKeyPress={handleKeyPress}
          />
        <button onClick={handleSendMessage} type='submit'>Send</button>
      </Column>
    );
}

export default Messages