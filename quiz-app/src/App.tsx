import React from 'react';
import logo from './logo.svg';
// Components
import QuestionCard from './components/QuestionCard'
import { useSelector } from 'react-redux'
import * as questions_api from './services/questions-api'

const TOTAL_QUESTIONS = 10


function App() {
  // make the API call when trivia game is started
  const startQuiz = async () => {

  }
  // check answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  // next question
  const nextQuestion = () => {


  }

  const test = () => {
    console.log('test button clicked')
    const data = questions_api.fetchQuizQuestions(TOTAL_QUESTIONS, questions_api.Difficulty.EASY)
    .then((RecievedData) => {
      console.log('data reciebed', RecievedData)
    })
  }

  const username = useSelector((state: any) => state.score)
  console.log({username})


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
