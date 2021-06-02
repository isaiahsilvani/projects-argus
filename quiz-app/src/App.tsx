import React from 'react';
import logo from './logo.svg';
// Components
import QuestionCard from './components/QuestionCard/QuestionCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuizQuestions, Difficulty } from './services/questions-api'
// action creators for redux store state management
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/';

const TOTAL_QUESTIONS = 10


function App() {
  // set up action creators for state management
  const dispatch = useDispatch()
  const { setUserClicked, setGameover, setLoading, setQuestions, setScore, setNumber, setUserAnswers } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  const userClickedState = useSelector((state: any) => state.userClicked)
  console.log(scoreState, loadingState, gameoverState, questionsState, numberState, userAnswersState, userClickedState)
  // make the API call when trivia game is started
  const startQuiz = async () => {
    // Reset everything in state so player can do the quiz again
    setGameover(false)
    setLoading(true)
    setNumber(0)
    setUserAnswers([])
    setScore(0)
    setUserClicked(false)

    const data = fetchQuizQuestions(
      TOTAL_QUESTIONS, 
      Difficulty.EASY)
    .then((recievedData) => {
      if(recievedData){
        setQuestions(recievedData)
        setLoading(false)  // idea - add a CSS loader!
      }
    })
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
    <div className="App">
      <h1>The Ultimate Quiz</h1>
      {questionsState.length === 0 || userAnswersState.length === TOTAL_QUESTIONS ? (
        <>
        {userAnswersState.length === TOTAL_QUESTIONS && (<h2>Game Over</h2>)}
          <button className="start" onClick={startQuiz}>
            {gameoverState ? "Start" : "Reset"}
          </button>
        </>
      ): null}
      
      {!gameoverState && <p className="score">Score: {scoreState}</p>}
      {loadingState && <p>loading...</p> }
      {(!loadingState && !gameoverState) && (
          <QuestionCard />
      )}

      {((userClickedState && !gameoverState) && (questionsState.length !== userAnswersState.length)) && 
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
      }
    </div>
  );
}

export default App;
