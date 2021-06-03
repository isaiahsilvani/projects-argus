import { combineReducers } from 'redux'
import gameoverReducer from './gameoverReducer'
import loadingReducer from './loadingReducer'
import numberReducer from './numberReducer'
import questionsReducer from './questionsReducer'
import userAnswersReducer from './userAnswersReducer'
import scoreReducer from './scoreReducer'
import userClickedReducer from './userClickedReducer'
import settingsReducer from './settingsReducer'
import userScoresReducer from './userScoresReducer'

const reducers = combineReducers({
  gameover: gameoverReducer,
  loading: loadingReducer,
  number: numberReducer,
  questions: questionsReducer,
  userAnswers: userAnswersReducer,
  score: scoreReducer,
  userClicked: userClickedReducer,
  settings: settingsReducer,
  userscores: userScoresReducer
})

export default reducers
// define State Type, this exactly interprets what we want
// interpret whatever type we pass in traingle brackets
export type State = ReturnType<typeof reducers>