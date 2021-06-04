import React, { useState, useEffect } from 'react'
import { Difficulty } from '../../services/questions-api'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import styled from '@emotion/styled'

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5em;
`

const Label = styled.label`
  margin: 10px;
  text-align: center;
`

const Input = styled.input`
  font-size: 1em;
  text-align: center;
  width: 50%;
`

const Select = styled.select`
  font-size: 1em;
  text-align: center;
  margin-bottom: 1.3em;
  width: 50%;
`

const QuizSettings = () => {
    // here are the settings in state
    const settings = useSelector((state: any) => state.settings)
    const dispatch = useDispatch()
    const { setSettings } = bindActionCreators(actionCreators, dispatch) 
    console.log(settings)

    // temporary storage for settings state
    const [difficulty, setDiffuclty] = useState("easy")
    const [amount, setAmount] = useState(10)

    // use two calls on onChange to change local and global state
    const handleAmount = (amount:number) => {
      setAmount(amount)
      setSettings(amount, difficulty)
    }

    const handleDifficulty = (difficulty:string) => {
      setDiffuclty(difficulty)
      setSettings(amount, difficulty)
    }

    // onChange, trigger state storage
    return (
      <div className="quiz-settings">
        <Settings>
          <Label>Choose # of Questions: </Label>
          <Input 
            type="number" 
            id="quiznum" 
            name="question-num" 
            value={amount} 
            onChange={e => 
            handleAmount(parseInt(e.target.value))}
            />

          <Label>Choose difficulty: </Label>
          <Select name="difficulty-setting" id="difficulty-setting" onChange={e => handleDifficulty(e.target.value)}>
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
          </Select>
        </Settings>
      </div>
    );
}

export default QuizSettings