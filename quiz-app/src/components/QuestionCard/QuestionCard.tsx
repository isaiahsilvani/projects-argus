import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { setGameover } from '../../state/action-creators';
import { format } from '../../utils/utils'
import styled from '@emotion/styled'

const QuestionCardStyle = styled.div`
  text-align: left;
  width: 100%;
  margin-left: 3em;
`
const Div = styled.div`
  height: 62px;
`

const Question = styled.div`
  font-size: 1.7em;
  font-weight: 500;
  width: 100%;
`

const QuestionText = styled.div`
  font-size: 1.3em;
  margin: 1em 0;
`

const Answer = styled.button`
  margin: 10px 0;
  color: black;
  font-size: 1.2em;
  padding: 8px 10px;
  background: rgb(210,245,244);
  background: linear-gradient(97deg, rgba(210,245,244,1) 0%, rgba(0,255,2,0.43187066974595845) 100%);
  &:hover{
    background: rgb(16,122,118);
    background: linear-gradient(97deg, rgba(16,122,118,1) 0%, rgba(28,108,1,1) 100%);
    color: white;
    cursor: pointer;
  }
  &:active{
    color: white;
    background-color: #138080
  }
  &:disabled{
    cursor: not-allowed;
    background: rgb(10,14,10);
    background: linear-gradient(97deg, rgba(10,14,10,0.43187066974595845) 0%, rgba(239,241,241,1) 100%);
  }

`

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
  const settings = useSelector((state: any) => state.settings)
  const TOTAL_QUESTIONS = settings.amount
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