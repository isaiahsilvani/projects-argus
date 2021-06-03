type Question = {
  category: string;
  correct_answer: string,
  difficulty: string;
  incorrect_answers: string[],
  question: string;
  type: string
}

type QuestionState = Question & { answers: string[] }

type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

type UserScore = {
  username: string,
  score: number,
  difficulty: string
}