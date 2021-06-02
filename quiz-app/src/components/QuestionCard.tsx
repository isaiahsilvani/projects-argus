import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/';

const TOTAL_QUESTIONS = 10

type Props = {
  checkAnswer: any
}



// display a question based on question number
const QuestionCard: React.FC<Props> = ({ checkAnswer }) => {

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  console.log(scoreState, loadingState, gameoverState, questionsState, numberState, userAnswersState)
  const currentQuestion = questionsState[numberState]
  console.log(currentQuestion)

  return (
    <div>
      <p className="question-number"> Question {numberState + 1} / {TOTAL_QUESTIONS}</p>
      <p className="question"> {currentQuestion.question} </p>
      {currentQuestion.answers.map((answer: string, idx: string) => (
        <div key={idx}>
          <button>{answer}</button>
        </div>
      ))}
    </div>
  )
}

export default QuestionCard