import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/'
import * as api from '../../services/userscore-api'
import styled from '@emotion/styled'

const InputDiv = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const H = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
`
const Input = styled.input`
  font-size: 1.5em;
  margin-bottom: 15px;
`
const Button = styled.button`
  width: 70%;
  font-size: 1.5em;
  margin: 10px;
  text-align: center;
  justify-self: center;
  background: rgb(255,175,189);
  background: radial-gradient(circle, rgba(255,175,189,1) 15%, rgba(255,195,160,1) 76%, rgba(255,231,0,1) 97%);
  &:hover{
    color: white;
    border-color: white;
    background: rgb(253,187,45);
    background: radial-gradient(circle, rgba(253,187,45,1) 6%, rgba(240,214,214,1) 93%);
    cursor: pointer;
  }
`

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
        console.log('send!!!!')
        console.log(settings.difficulty, scoreState, username)
        //userscores: {username: string, score: number, difficulty: string
        console.log([...userScores, {username, score: scoreState, difficulty: settings.difficulty}])
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