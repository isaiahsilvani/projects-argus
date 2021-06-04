import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/'
import * as api from '../../services/userscore-api'
import { InputDiv, Input, H, Button } from './UserInput.css.js'

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
      if(username){
        setScoreSet(true)
        setUserScores([...userScores, {username, score: scoreState, difficulty: settings.difficulty}])
        api.saveRequest(username, scoreState, settings.difficulty)
      }
    }

    return (
      <InputDiv>
        {!scoreset ? (
          <>
            <H>Save your score?</H>
            <Input placeholder="Your name..." type="text" name='username' onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={handleClick}>Save</Button>
          </>
        ) : (
          <>
            <H>Score Saved!</H>
          </>
        )}
      </InputDiv>
    );
}

export default UserInput