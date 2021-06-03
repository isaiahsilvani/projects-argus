import { ActionType } from "../action-types"
import { Dispatch } from "redux"    // use Dispatch type from redux to please typescript
import { Action } from '../actions/index'

export const setUserScores = (userscores: {username: string, score: number, difficulty: string}[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GETUSERSCORES,
      userscores
    })
  }
}

export const setSettings = (amount: number, difficulty: string) => {
  return (dispatch: Dispatch<Action>) => {
    console.log('clicked action hit: ', amount, difficulty)
    dispatch({
      type: ActionType.SETTINGS,
      settings: {
        amount,
        difficulty
      }
    })
  }
}

export const setUserClicked = (clicked: boolean) => {
  console.log('clicked action hit: ', clicked)
  return (dispatch: Dispatch<Action>) => {
    console.log('clicked action hit: ', clicked)
    dispatch({
      type: ActionType.USERCLICKED,
      clicked
    })
  }
}

export const setLoading = (loading: boolean) => {
  console.log('loading action hit: ', loading)
  return (dispatch: Dispatch<Action>) => {
    console.log('loading action hit: ', loading)
    dispatch({
      type: ActionType.LOADING,
      loading
    })
  }
}

export const setQuestions = (questions: Question[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.QUESTIONS,
      questions
    })
  }
}

export const setNumber = (number: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.NUMBER,
      number
    })
  }
}

export const setUserAnswers = (useranswers: AnswerObject[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USERANSWERS,
      useranswers
    })
  }
}

export const setScore = (score: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SCORE,
      score
    })
  }
}

export const setGameover = (gameover: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GAMEOVER,
      gameover
    })
  }
}