import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../../state/store'
import { bindActionCreators } from 'redux';

interface EnterUsernameProps {
  username: string,
  setUser: any,
  handleConnection: any
}

const EnterUsername: React.FC<EnterUsernameProps> = ({ username, setUser, handleConnection }) => {
  const dispatch = useDispatch()
  const { setUsername } = bindActionCreators(actionCreators, dispatch)
  const user = useSelector((store: State) => store.username)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('username to set in redux store: ', username)
    handleConnection(username)
    setUsername(username)
  }


    return (
      <>
      <form onSubmit={e => {
        e.preventDefault()
        handleConnection()
      }}>
        <input
          type="text"
          value={username}
          onChange={e => setUser(e.target.value)}
          placeholder="Enter your username..."
          required={true} />
        <button onClick={handleClick} type='submit'>Submit</button>
      </form>
    </>
    );
}

export default EnterUsername