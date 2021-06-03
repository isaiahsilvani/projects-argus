import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as api from '../../services/message-api'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/';


const Header = () => {
    const dispatch = useDispatch()
    const { ClearMessages } = bindActionCreators(actionCreators, dispatch)
    const current = useSelector((store: State) => store.current)
    const messages = useSelector((store: State) => store.messages)

    const handleClick = () => {
      ClearMessages()
    }

    return (
      <div className="header">
        HEADER
        {(current && messages.length > 0) && (
          <button onClick={handleClick}>
            Delete Messages
          </button>
        )}
      </div>
    );
}

export default Header