import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { store } from '../../state/store'
import User from './User';
import styled from '@emotion/styled'

const ConnectedUsersBlock = styled.div`
  display: inline;
  background-color: grey;
  height: 90vh;
  text-align: center;
`

const Loading = styled.div`
  grid-column: 2 / 2
`

const Username = styled.span`
  text-align: center
`

const Header = styled.div`
  font-size: 1.2em;
`

type IUser = {
  id: string,
  username: string
}


const ConnectedUsers = () => {
    const dispatch = useDispatch()
    const { setUsername } = bindActionCreators(actionCreators, dispatch)
    const connectedUsers = useSelector((store: State) => store.connectedUsers)
    const connectedUser = useSelector((store: State) => store.username)
    console.log({ connectedUsers })

    return (
      <ConnectedUsersBlock>
        <Header>Connected Users</Header>
        <ul>
          {connectedUsers.length === 0 && <Loading>Loading users...</Loading>}
          {connectedUsers.map((user: any) => (
            <div key={user.id}>
              {
                !(user.username === connectedUser) && 
                <>
                <Username>{user.username}</Username>
                </>
              }
            </div>
          ))}
        </ul>
      </ConnectedUsersBlock>
    );
}

export default ConnectedUsers