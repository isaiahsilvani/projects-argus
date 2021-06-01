import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { store } from '../../state/store'
import User from './User';

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
      <div className="connected-users">
        <h2>Connected Users</h2>
        <ul>
          {connectedUsers.map((user: any) => (
            <div key={user.id}>
              {
                !(user.username === connectedUser) && 
                <>
                <h2>{user.username}</h2>
                </>
              }
            </div>
          ))}
        </ul>
      </div>
    );
}

export default ConnectedUsers