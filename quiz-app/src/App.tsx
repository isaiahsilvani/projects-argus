import React from 'react';
import logo from './logo.svg';
// Components
import QuestionCard from './components/QuestionCard'

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


  return (
    <div className="App">
      <h1>The Ultimate Quiz</h1>
      <button className="start" onClick={startQuiz}>Start</button>
      <p className="score">Score: </p>
      <p>Loading Questions...</p>
      <QuestionCard />

      <button className="next-btn" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
