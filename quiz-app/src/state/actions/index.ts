import { ActionType } from '../action-types'

interface SetLoadingAction {
  type: ActionType.LOADING,
  loading: boolean
}

interface SetQuestionsAction {
  type: ActionType.QUESTIONS,
  questions: Question[]
}

interface SetNumberAction {
  type: ActionType.NUMBER,
  number: number
}

interface SetUserAnswers {
  type: ActionType.USERANSWERS,
  useranswers: AnswerObject[]
}

interface setScoreAction {
  type: ActionType.SCORE,
  score: number
}

interface setGameOverAction {
  type: ActionType.GAMEOVER,
  gameover: boolean
}

interface setUserClickedAction {
  type: ActionType.USERCLICKED,
  clicked: boolean
}

export type Action = setGameOverAction | setScoreAction | SetUserAnswers | SetNumberAction | SetLoadingAction | SetQuestionsAction | setUserClickedAction