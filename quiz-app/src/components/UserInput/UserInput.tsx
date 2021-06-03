import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../../services/userscore-api'

const UserInput = () => {
    // temporary state holders for this single component
    const [username, setUsername] = useState("")
    const [scoreset, setScoreSet] = useState(false)
    // global state we will also pass to the backend
    const scoreState = useSelector((state: any) => state.score)
    const settings = useSelector((state: any) => state.settings)

    const handleClick = () => {
      setScoreSet(true)
      console.log('send!!!!')
      console.log(settings.difficulty, scoreState, username)
      api.saveRequest(username, scoreState, settings.difficulty)
    }

    return (
      <div>
        {!scoreset ? (
          <>
            <h4>Save your score?</h4>
            <input type="text" name='username' onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={handleClick}>Save</button>
          </>
        ) : (
          <>
            <h4>Score Saved!</h4>
          </>
        )}
      </div>
    );
}

export default UserInput