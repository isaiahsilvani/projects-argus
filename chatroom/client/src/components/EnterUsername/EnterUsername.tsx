import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import styled from '@emotion/styled'

const EnterUsernameBlock = styled.div`
  display: flex;
  margin-top: 5.5em;
  grid-column: span 2;
  background-color: white;
  height: 70%;
  border-radius: 30px;
  width: 80%;
  justify-self: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  -webkit-box-shadow: -1px 1px 5px 9px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 1px 5px 9px rgba(0,0,0,0.75);
  box-shadow: -1px 1px 5px 9px white;
`
const H1 = styled.h1`
  font-size: 3em;
  margin-bottom: 30px;
`

const Controls = styled.div`
  flex-direction: column;
`

const Input = styled.input`
  font-size: 1.3em;
  padding: 5px;
  border-radius: 5px;
`

const Button = styled.button`
  margin-top: 1.4em;
  font-size: 1.3em;
  padding: 10px;
  &:hover{
    background-color: #E6F7F7;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
  &:disabled{
    
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
      <H1>Enter the Chatroom</H1>
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