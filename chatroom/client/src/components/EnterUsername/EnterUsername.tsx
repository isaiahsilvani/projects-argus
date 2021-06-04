import React from 'react'
import { actionCreators } from '../../state/';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import {  EnterUsernameBlock, H1, Input, Button } from './EnterUsername.css.js'

interface EnterUsernameProps {
  username: string,
  setUser: any,
  handleConnection: any
}

const EnterUsername: React.FC<EnterUsernameProps> = ({ username, setUser, handleConnection }) => {
  const dispatch = useDispatch()
  const { setUsername, setCurrent } = bindActionCreators(actionCreators, dispatch)


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