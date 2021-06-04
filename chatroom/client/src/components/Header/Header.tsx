import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import { HeaderBlock, DeleteMsgs, Span, Center, NextSpan, Button } from './Header.css.js'

const Header = () => {
    const dispatch = useDispatch()
    const { ClearMessages } = bindActionCreators(actionCreators, dispatch)
    const current = useSelector((store: State) => store.current)

    const handleClick = () => {
      ClearMessages()
    }

    return (
      <HeaderBlock>
        {!current && <Span>The Ultimate Chatroom</Span>}
        {(current) && (
          <DeleteMsgs>
            <Center>
              <NextSpan>Ultimate Chatroom</NextSpan>
            </Center>
            <Button onClick={handleClick}>
              Clear Messages
            </Button>
          </DeleteMsgs>
        )}

      </HeaderBlock>
    );
}

export default Header