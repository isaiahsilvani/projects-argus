import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as api from '../../services/message-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import styled from '@emotion/styled'

const HeaderBlock = styled.div`
  background-color: lightpink;
  height: 10vh;
  display: grid;
  align-items: baseline;
`
const DeleteMsgs = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding-right: 3em;
`

const Button = styled.button`
  font-size: 1.1em;
  letter-spacing: 0.04em;
  padding: 5px;
  border-radius: 4px
`

const Header = () => {
    const dispatch = useDispatch()
    const { ClearMessages } = bindActionCreators(actionCreators, dispatch)
    const current = useSelector((store: State) => store.current)
    const messages = useSelector((store: State) => store.messages)

    const handleClick = () => {
      api.deleteMessages()
      ClearMessages()
    }

    return (
      <HeaderBlock>
        {(current && messages.length > 0) && (
          <DeleteMsgs>
            <Button onClick={handleClick}>
              Delete Messages
            </Button>
          </DeleteMsgs>
        )}

      </HeaderBlock>
    );
}

export default Header