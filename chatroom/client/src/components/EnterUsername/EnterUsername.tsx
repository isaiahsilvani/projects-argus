import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import styled from '@emotion/styled'

const EnterUsernameBlock = styled.div`
  display: flex;
  padding-top: 5em;
  grid-column: span 2;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`

const Controls = styled.div`
  flex-direction: column;
`

const Input = styled.input`
  margin-top: 1em;
  font-size: 1.3em;
  padding: 5px;
  border-radius: 5px;
`

const Button = styled.button`
  margin-top: 1.4em;
  font-size: 1.3em;
  &:disabled{
    color: grey
  }
`

interface EnterUsernameProps {
  username: string,
  setUser: any,
  handleConnection: any
}

const EnterUsername: React.FC<EnterUsernameProps> = ({ username, setUser, handleConnection }) => {
  const dispatch = useDispatch()
  const { setUsername, setCurrent } = bindActionCreators(actionCreators, dispatch)
  const user = useSelector((store: State) => store.username)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setCurrent(true)
    handleConnection(username)
    setUsername(username)
  }


    return (
      <EnterUsernameBlock>
      <h1>Enter the Chatroom</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleConnection()
      }}>
        <Input
          type="text"
          value={username}
          onChange={e => setUser(e.target.value)}
          placeholder="Enter your username..."
          required={true} />
          <br/>
        <Button disabled={username ? false : true}onClick={handleClick} type='submit'>Submit</Button>
      </form>
      
    </EnterUsernameBlock>
    );
}

export default EnterUsername