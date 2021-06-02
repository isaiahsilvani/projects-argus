import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/';


const TOTAL_QUESTIONS = 10

// display a question based on question number
const QuestionCard: React.FC = () => {
  // set up action creators to manipulate state
  const dispatch = useDispatch()
  const { setScore } = bindActionCreators(actionCreators, dispatch)

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
  // check the answer on question click
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameoverState){
      const answer = e.currentTarget.value
      // check the answer against the correct answer
      const correct = currentQuestion.correct_answer === answer
      // Add score if answer is correct
      console.log(scoreState, typeof scoreState)
      if (correct) setScore(scoreState + 1)
    }
  }

  return (
    <div>
      <p className="question-number"> Question {numberState + 1} / {TOTAL_QUESTIONS}</p>
      <p className="question"> {currentQuestion.question} </p>
      {currentQuestion.answers.map((answer: string, idx: string) => (
        <div key={idx}>
          <button value={answer} onClick={checkAnswer}>
            {answer}
          </button>
        </div>
      ))}
    </div>
  )
}

export default QuestionCard