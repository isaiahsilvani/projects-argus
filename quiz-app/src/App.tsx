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
  background: rgb(246,255,35);
  background: linear-gradient(97deg, rgba(246,255,35,0.8314087759815243) 0%, rgba(245,183,0,1) 100%);
  &:hover{
    color: white;
    background-color: #E6F7F7;
    cursor: pointer;
    background: rgb(193,144,1);
    background: linear-gradient(97deg, rgba(193,144,1,1) 1%, rgba(118,122,16,0.8314087759815243) 100%);
  }
  &:active{
    color: white;
    background: rgb(193,144,1);
    background: linear-gradient(97deg, rgba(193,144,1,1) 1%, rgba(118,122,16,0.8314087759815243) 100%);
  }
  &:disabled{
    cursor: not-allowed;
    background-color: #D5E6E6;
  }
`
const H1 = styled.h1`
  font-size: 3em;
  letter-spacing: 0.1em;
  margin: 20px 0;
`

const Score = styled.span`
  font-size: 2.4em;
  font-weight: 600;
`

const Background = styled.div`
  background-color: white;
  border: 3px solid black;
  -moz-box-shadow: 3px 3px 3px black;
  -webkit-box-shadow: 3px 3px 3px black;
  box-shadow: 7px 7px 7px black;
  margin-top: 3em;
  border-radius: 20px;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const Button = styled.button`
  font-size: 1.4em;
  padding: 0.3em 0.8em;
  width: 230px;
  color: black;
  background: rgb(255,175,189);
  background: radial-gradient(circle, rgba(255,175,189,1) 15%, rgba(255,195,160,1) 76%, rgba(255,231,0,1) 97%);
  margin-bottom: 1.5em;
  &:hover{
    color: white;
    border-color: white;
    background: rgb(253,187,45);
    background: radial-gradient(circle, rgba(253,187,45,1) 6%, rgba(240,214,214,1) 93%);
    cursor: pointer;
  }
`

const H2 = styled.div`
  font-size: 3em;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
`

const StartButton = styled.button`
  font-size: 1.4em;
  padding: 0.3em 0.8em;
  width: 230px;
  margin-bottom: 1em;
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
const Center = styled.div`
  display: flex;
  justify-content: center;
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
  console.log('see user scores...', seeUserScores)
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
    setSeeUserScores(false)
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
    <Center>
      <Background>
          <H1>The Ultimate Quiz</H1>
          {questionsState.length === 0 || userAnswersState.length === TOTAL_QUESTIONS ? (
            <>
            {userAnswersState.length === TOTAL_QUESTIONS && (<H2>Game Over</H2>)}
            {!loadingState && (
              <>
                {gameoverState && <QuizSettings />}
                <StartButton className="start" onClick={gameoverState ? startQuiz : resetQuiz}>
                  {gameoverState ? "Start" : "Reset"}
                </StartButton>
                <Button onClick={() => setSeeUserScores(!seeUserScores)}>
                  {seeUserScores ? 'Close User Scores' : 'See User Scores'}
                </Button>
                
                
              </>
            )}
            </>
          ): null}
          
          {(!gameoverState && !loadingState) && <p className="score"><Score>Score: {scoreState}</Score></p>}
          {(!gameoverState && !loadingState && (questionsState.length === userAnswersState.length)) && <UserInput/>}
          {loadingState && <p>loading...</p> }
          {(!loadingState && !gameoverState && !seeUserScores && (questionsState.length !== userAnswersState.length)) && (
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
      </Center>
  );
}

export default App;
