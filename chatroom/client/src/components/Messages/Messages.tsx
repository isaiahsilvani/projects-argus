import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { UserName, Text, Txt, ClientBubble, OtherMsg, Welcome, OtherBubble, ClientMsg, Controls, Textarea, Button, MsgsList, Column } from './Messages.css.js'

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

    const handleKeyPress = (e: any) => {
      if(e.key === 'Enter'){
        handleSendMessage()
      }
    }
    
    return (
      <Column>
        <MsgsList>
          <div className="message-list">
            {messages.length === 0 && <Welcome>Welcome to the room!<br/><Txt>Send a message! :)</Txt></Welcome>}
            {messages.map((message: Message, idx: number) => (
              <div key={idx}>
                  {message.username === username ? 
                  <>
                    <ClientMsg>
                      <ClientBubble>
                        <UserName>{message.username}</UserName>
                        <Text>{message.message}</Text>
                      </ClientBubble>
                    </ClientMsg>
                  </>                  
                  :
                  <>
                    <OtherMsg>
                      <OtherBubble>
                        <UserName>{message.username}</UserName>
                        <Text>{message.message}</Text>
                      </OtherBubble>
                    </OtherMsg>
                  </>     
                  }

              </div>
            ))}
          </div>
        </MsgsList>
        <Controls>
          <Textarea 
            placeholder="Type your message..." 
            value={message}
            onChange={e => setMessage(e.target.value)} 
            onKeyPress={handleKeyPress}
            />
          <Button onClick={handleSendMessage} type='submit'>Send</Button>
        </Controls>
      </Column>
    );
}

export default Messages