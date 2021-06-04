import React from 'react'
import { useSelector } from 'react-redux'
import { ConnectedUsersBlock, Center, Loading, Username, Header } from './ConnectedUsers.css.js'

const ConnectedUsers = () => {
  
    const connectedUsers = useSelector((store: State) => store.connectedUsers)
    const connectedUser = useSelector((store: State) => store.username)

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