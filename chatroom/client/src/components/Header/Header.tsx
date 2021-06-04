import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';
import styled from '@emotion/styled'

const HeaderBlock = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: white;
  height: 10vh;
  background: rgb(34,193,195);
  background: linear-gradient(0deg, #fdbb2d 0%, white 25%);
  display: grid;
`
const DeleteMsgs = styled.div`
  text-align: left;
  display: flex;
  height: 100%;
  font-family: 'Ubuntu', sans-serif;
  justify-content: space-between;
  background: rgb(208,201,229);
  background: linear-gradient(90deg, rgba(208,201,229,1) 25%, rgba(103,212,215,0.7973564425770308) 75%);
  align-items: center;
  padding-right: 3em;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Button = styled.button`
  font-size: 1.1em;
  letter-spacing: 0.04em;
  padding: 10px;
  justify-self: end;
  border-radius: 4px;
  &:hover{
    background-color: #E6F7F7;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
`
const Span = styled.span`
  font-size: 2em;
  align-self: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
  letter-spacing: 0.07em;
  margin-bottom: 15px;
`
const NextSpan = styled.span`
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.07em;
  justify-self: center;
`

const Header = () => {
    const dispatch = useDispatch()
    const { ClearMessages } = bindActionCreators(actionCreators, dispatch)
    const current = useSelector((store: State) => store.current)
    const messages = useSelector((store: State) => store.messages)

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