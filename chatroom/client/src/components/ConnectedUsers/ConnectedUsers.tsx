import React from 'react'
import { actionCreators } from '../../state/';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { store } from '../../state/store'
import User from './User';


const ConnectedUsers = () => {
    const dispatch = useDispatch()
    const { setUsername } = bindActionCreators(actionCreators, dispatch)
    const connectedUsers = useSelector((store: State) => store.connectedUsers)
    console.log({ connectedUsers })

    return (
      <div className="connected-users">
        <h2>Connected Users</h2>
          
        <ul>
          <User/>
        </ul>
      </div>
    );
}

export default ConnectedUsers