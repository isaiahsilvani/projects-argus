import React, { useState, useEffect } from 'react'
import { Difficulty } from '../../services/questions-api'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';

const QuizSettings = () => {
    // here are the settings in state
    const settings = useSelector((state: any) => state.settings)
    const dispatch = useDispatch()
    const { setSettings } = bindActionCreators(actionCreators, dispatch) 
    console.log(settings)

    // temporary storage for settings state
    const [difficulty, setDiffuclty] = useState("easy")
    const [amount, setAmount] = useState(10)

    // a use effect that is updating the redux store when local state is changed
    useEffect(() => {
      setSettings(amount, difficulty)

    }, [amount, difficulty]);

    // onChange, trigger state storage
    return (
      <div className="quiz-settings">

        <label># of Questions: </label>
        <input 
          type="number" 
          id="quiznum" 
          name="question-num" 
          value={amount} 
          onChange={e => 
          setAmount(parseInt(e.target.value))}
          />

        <label>Choose difficulty: </label>
        <select name="difficulty-setting" id="difficulty-setting" onChange={e => setDiffuclty(e.target.value)}>
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
        </select>
      </div>
    );
}

export default QuizSettings