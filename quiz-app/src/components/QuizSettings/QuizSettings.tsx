import { useState } from 'react'
import { Difficulty } from '../../services/questions-api'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { Settings, Label, Input, Select } from './QuizSettings.css.js'

const QuizSettings = () => {
    // here are the settings in state
    
    const dispatch = useDispatch()
    const { setSettings } = bindActionCreators(actionCreators, dispatch) 


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