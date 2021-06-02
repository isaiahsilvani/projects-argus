import React from 'react';
import logo from './logo.svg';
// Components
import QuestionCard from './components/QuestionCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuizQuestions, Difficulty } from './services/questions-api'
// action creators for redux store state management
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/';

const TOTAL_QUESTIONS = 10


function App() {
  // set up action creators for state management
  const dispatch = useDispatch()
  const { setGameover, setLoading, setQuestions } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  console.log(scoreState, loadingState, gameoverState, questionsState)
  // make the API call when trivia game is started
  const startQuiz = async () => {
    setGameover(false)
    setLoading(true)

    const data = fetchQuizQuestions(
      TOTAL_QUESTIONS, 
      Difficulty.EASY)
    .then((recievedData) => {
      console.log('data reciebed', recievedData)
      setQuestions(recievedData)
    })
  }
  // check answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  // next question
  const nextQuestion = () => {


  }

  const test = () => {

  }


  return (
    <div className="App">
      <h1>The Ultimate Quiz</h1>
      <button className="start" onClick={startQuiz}>Start</button>
      <p className="score">Score: </p>
      <p>Loading Questions...</p>
      <QuestionCard checkAnswer={checkAnswer}/>
      <button onClick={test}>Test</button>
      <button className="next-btn" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
