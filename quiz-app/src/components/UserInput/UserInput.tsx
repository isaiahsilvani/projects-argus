import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/'
import * as api from '../../services/userscore-api'

const UserInput = () => {
    // temporary state holders for this single component
    const [username, setUsername] = useState("")
    const [scoreset, setScoreSet] = useState(false)

    const dispatch = useDispatch()
    const { setUserScores } = bindActionCreators(actionCreators, dispatch)
    const userScores = useSelector((state: any) => state.userscores)
    const difficulty = useSelector((state: any) => state.difficulty)
    // global state we will also pass to the backend
    const scoreState = useSelector((state: any) => state.score)
    const settings = useSelector((state: any) => state.settings)

    const handleClick = () => {
      setScoreSet(true)
      console.log('send!!!!')
      console.log(settings.difficulty, scoreState, username)
      //userscores: {username: string, score: number, difficulty: string
      console.log([...userScores, {username, score: scoreState, difficulty: settings.difficulty}])
      setUserScores([...userScores, {username, score: scoreState, difficulty: settings.difficulty}])
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