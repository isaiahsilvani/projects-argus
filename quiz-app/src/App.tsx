import React, { useState } from 'react';
// Components
import QuestionCard from './components/QuestionCard/QuestionCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuizQuestions } from './services/questions-api'
// action creators for redux store state management
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/';
import QuizSettings from './components/QuizSettings/QuizSettings';
import UserInput from './components/UserInput/UserInput';
import UserScoreList from './components/UserScoreList/UserScoreList';
import { Center, Background, H1, H2, StartButton, Button, Score, NextQuestion } from './App.css.js'

function App() {
  // set up action creators for state management
  const dispatch = useDispatch()
  const { setUserClicked, setGameover, setLoading, setQuestions, setScore, setNumber, setUserAnswers, setSettings } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: State) => state.score)
  const loadingState = useSelector((state: State) => state.loading)
  const gameoverState = useSelector((state: State) => state.gameover)
  const questionsState = useSelector((state: State) => state.questions)
  const numberState = useSelector((state: State) => state.number)
  const userAnswersState = useSelector((state: State) => state.userAnswers)
  const userClickedState = useSelector((state: State) => state.userClicked)
  const settings = useSelector((state: any) => state.settings)

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
    
    fetchQuizQuestions(settings.amount, settings.difficulty)
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
