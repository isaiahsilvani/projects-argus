import React, { useState } from 'react';
import logo from './logo.svg';
// Components
import QuestionCard from './components/QuestionCard/QuestionCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuizQuestions, Difficulty } from './services/questions-api'
// action creators for redux store state management
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/';
import QuizSettings from './components/QuizSettings/QuizSettings';
import UserInput from './components/UserInput/UserInput';
import UserScoreList from './components/UserScoreList/UserScoreList';

import styled from '@emotion/styled'

const NextQuestion = styled.button`
  margin: 10px 0;
  color: black;
  font-size: 1.2em;
  padding: 8px 10px;
  background-color: #C7F2F2;
  &:hover{
    background-color: #E6F7F7;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
  &:disabled{
    cursor: not-allowed;
    background-color: #D5E6E6;
  }

`

const Score = styled.span`
  font-size: 2.4em;
  font-weight: 600;
`

const Background = styled.div`
  background-color: lightpink;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`


const Button = styled.button`
  font-size: 1.4em;
  padding: 0.3em 0.8em;
  margin-bottom: 1em;
  border: 1px solid black;
  &:hover{
    color: white;
    background-color: darkgrey;
    cursor: pointer;
  }
  &:active{
    background-color: #2E2E2E
  }
`

const StartButton = styled.button`
  font-size: 1.4em;
  padding: 0.3em 0.8em;
  width: 9.4em;
  margin-bottom: 1em;
  border: 1px solid black;
  &:hover{
    color: white;
    background-color: darkgrey;
    cursor: pointer;
  }
  &:active{
    background-color: #2E2E2E
  }
`

function App() {
  // set up action creators for state management
  const dispatch = useDispatch()
  const { setUserClicked, setGameover, setLoading, setQuestions, setScore, setNumber, setUserAnswers, setSettings } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  const userClickedState = useSelector((state: any) => state.userClicked)
  const settings = useSelector((state: any) => state.settings)
  console.log(scoreState, loadingState, gameoverState, questionsState, numberState, userAnswersState, userClickedState)
  console.log(settings.amount, settings.difficulty)
  const TOTAL_QUESTIONS = settings.amount

  const [seeUserScores, setSeeUserScores] = useState(false)
  // make the API call when trivia game is started
  const startQuiz = async () => {
    // Reset everything in state so player can do the quiz again
    setGameover(false)
    setLoading(true)
    setNumber(0)
    setUserAnswers([])
    setScore(0)
    setUserClicked(false)
    setSeeUserScores(false)
    
    const data = fetchQuizQuestions(settings.amount, settings.difficulty)
    .then((recievedData) => {
      if(recievedData){
        setQuestions(recievedData)
        setLoading(false)  // idea - add a CSS loader!
      }
    })
  }

  const resetQuiz = () => {
    setGameover(true)
    setNumber(0)
    setScore(0)
    setUserClicked(false)
    setSettings(settings.amount, settings.difficulty)
    setQuestions([])
    setUserAnswers([])
  }

  // next question
  const nextQuestion = () => {
    // move onto the next question if not the last question
    const nextQuestion = numberState + 1
    console.log('nextQ: ', nextQuestion, 'totalQ: ', TOTAL_QUESTIONS)
    // if next question is last question, set gameover
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameover(true) 
    } else {
      setNumber(nextQuestion)
      setUserClicked(false)
    }
  }

  // display start button only if gameover == true or user is at last question
  // only show score if gameover is not true
  return (
    <Background>
      

        <h1>The Ultimate Quiz</h1>
        {questionsState.length === 0 || userAnswersState.length === TOTAL_QUESTIONS ? (
          <>
          {userAnswersState.length === TOTAL_QUESTIONS && (<h2>Game Over</h2>)}
          {!loadingState && (
            <>
              {gameoverState && <QuizSettings />}
              <StartButton className="start" onClick={gameoverState ? startQuiz : resetQuiz}>
                {gameoverState ? "Start" : "Reset"}
              </StartButton>
              <Button onClick={() => setSeeUserScores(!seeUserScores)}>
                {seeUserScores ? 'Close User Scores' : 'See User Scores'}
              </Button>
              {(!gameoverState && !loadingState) && <UserInput/>}
              
            </>
          )}
          </>
        ): null}
        
        {(!gameoverState && !loadingState) && <p className="score"><Score>Score: {scoreState}</Score></p>}
        {loadingState && <p>loading...</p> }
        {(!loadingState && !gameoverState) && (
            <QuestionCard />
        )}

        {((userClickedState && !gameoverState) && (questionsState.length !== userAnswersState.length)) && 
          <NextQuestion className="next-btn" onClick={nextQuestion}>
            Next Question
          </NextQuestion>
        }

        {seeUserScores && (
          <UserScoreList/>
        )}
      </Background>
  );
}

export default App;
