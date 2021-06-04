import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { format } from '../../utils/utils'
import { QuestionCardStyle, Question, QuestionText, Div, Answer } from './QuestionCard.css.js'

// display a question based on question number
const QuestionCard: React.FC = () => {
  // set up action creators to manipulate state
  const dispatch = useDispatch()
  const { setScore, setUserAnswers, setUserClicked } = bindActionCreators(actionCreators, dispatch)

  // set up so you can also see state
  const scoreState = useSelector((state: any) => state.score)
  
  const gameoverState = useSelector((state: any) => state.gameover)
  const questionsState = useSelector((state: any) => state.questions)
  const numberState = useSelector((state: any) => state.number)
  const userAnswersState = useSelector((state: any) => state.userAnswers)
  const userClickedState = useSelector((state: any) => state.userClicked)
  const settings = useSelector((state: any) => state.settings)
  const TOTAL_QUESTIONS = settings.amount
  
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
      <QuestionCardStyle>
        <Question className="question-number"> Question {numberState + 1} / {TOTAL_QUESTIONS}</Question>
        <QuestionText className="question"> {format(currentQuestion.question)} </QuestionText>
        {currentQuestion.answers.map((answer: string, idx: string) => (
          <div key={idx}>
            <Answer disabled={userClickedState} value={answer} onClick={checkAnswer}>
              {format(answer)}
            </Answer>
          </div>
        ))}
        {((!userClickedState && !gameoverState) && (questionsState.length !== userAnswersState.length)) && 
          <Div></Div>
        }
      </QuestionCardStyle>
  )
}

export default QuestionCard