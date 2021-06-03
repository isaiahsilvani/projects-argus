import React from 'react'
import { useSelector } from 'react-redux'


const Header = () => {

    const current = useSelector((store: State) => store.current)
    const messages = useSelector((store: State) => store.messages)

    return (
      <div className="header">
        HEADER
        {(current && messages.length > 0) && (
          <button>
            Delete Messages
          </button>
        )}
      </div>
    );
}

export default Header