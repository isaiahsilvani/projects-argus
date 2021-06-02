import axios, { AxiosResponse } from 'axios'

export enum Difficulty {
  EASY = "easy",
  MEDIUM = 'medium',
  HARD = 'hard'
}


export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  try {

    const payload: AxiosResponse = await axios.get(endpoint)
    return payload.data.results

  } catch (error){

    throw new Error(error)

  }
}