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
  const { setGameover, setLoading, setQuestions, setScore, setNumber, setUserAnswers } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  console.log(scoreState, loadingState, gameoverState, questionsState, numberState, userAnswersState)
  // make the API call when trivia game is started
  const startQuiz = async () => {
    // Reset everything in state so player can do the quiz again
    setGameover(false)
    setLoading(true)
    setNumber(0)
    setUserAnswers([])
    setScore(0)
    

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
  // check answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  // next question
  const nextQuestion = () => {


  }

  // display start button only if gameover == true or user is at last question
  // only show score if gameover is not true
  return (
    <div className="App">
      <h1>The Ultimate Quiz</h1>
      {questionsState.length === 0 || userAnswersState.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
      ): null}
      
      {!gameoverState && <p className="score">Score: {scoreState}</p>}
      {loadingState && <p>Loading Questions...</p> }
      {(!loadingState && !gameoverState) && (
          <QuestionCard checkAnswer={checkAnswer}/>
      )}

      {questionsState.length !== 0 && <button className="next-btn" onClick={nextQuestion}>Next Question</button>}
      
    </div>
  );
}

export default App;
