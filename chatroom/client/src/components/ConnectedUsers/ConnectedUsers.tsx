import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { store } from '../../state/store'
import User from './User';
import styled from '@emotion/styled'

const ConnectedUsersBlock = styled.div`
  display: inline;
  background: rgb(214,239,240);
  font-family: 'Ubuntu', sans-serif;
  background: linear-gradient(0deg, rgba(214,239,240,1) 64%, rgba(208,201,229,1) 86%);
  padding: 5px;
  height: 90vh;
  text-align: center;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Loading = styled.div`
  grid-column: 2 / 2
`

const Username = styled.span`
  text-align: center;
  padding-top: 3em;
  font-weight: 500;
  font-size: 1.2em;
`

const Header = styled.div`
  font-size: 1.3em;
  font-weight: 900;
  margin-top: 1em;
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
        <Center>
          <Header>Connected Users</Header>
          <br/>
          <div>
            {connectedUsers.length === 0 && <Loading>Loading users...</Loading>}
            {connectedUsers.map((user: any) => (
              <div key={user.id}>
                {
                  !(user.username === connectedUser) && 
                  <>
                    <Username>{user.username}</Username>
                    <br/>
                  </>
                }
              </div>
            ))}
          </div>
        </Center>
      </ConnectedUsersBlock>
    );
}

export default ConnectedUsers