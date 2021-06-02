import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { setGameover } from '../../state/action-creators';
import { formatQuestion } from '../../utils/utils'

const TOTAL_QUESTIONS = 10

// display a question based on question number
const QuestionCard: React.FC = () => {
  // set up action creators to manipulate state
  const dispatch = useDispatch()
  const { setScore, setUserAnswers, setNumber, setUserClicked, setGameover } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  const loadingState = useSelector((state: any) => state.loading)
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  const userClickedState = useSelector((state: any) => state.userClicked)
  console.log(scoreState, loadingState, gameoverState, questionsState, numberState, userAnswersState, userClickedState)
  const currentQuestion = questionsState[numberState]
  // check the answer on question click

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameoverState){
      const answer = e.currentTarget.value
      // check the answer against the correct answer
      const correct = currentQuestion.correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore(scoreState + 1)
      // Save answer in the array for user answers
      const answerObject = {
        question: currentQuestion.question,
        answer,
        correct,
        correctAnswer: currentQuestion.correct_answer
      }
      setUserAnswers([...userAnswersState, answerObject])
      setUserClicked(true)
      
    }
  }

  return (
    <div>
      <p className="question-number"> Question {numberState + 1} / {TOTAL_QUESTIONS}</p>
      <p className="question"> {formatQuestion(currentQuestion.question)} </p>
      {currentQuestion.answers.map((answer: string, idx: string) => (
        <div key={idx}>
          <button disabled={userClickedState} value={answer} onClick={checkAnswer}>
            {answer}
          </button>
        </div>
      ))}
    </div>
  )
}

export default QuestionCard