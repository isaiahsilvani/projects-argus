import React from 'react'
import { useSelector } from 'react-redux'

interface UserProps {

}

const User: React.FC<UserProps> = ({}) => {

    const user = useSelector((store: State) => store.username)

    return (
      <li className="connected-user">
        <img src="/assets/user.png" alt="User" />
        <span>{user}</span>
      </li>
    );
}

export default User