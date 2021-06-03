import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:1337/'

export const saveRequest = async (username: string, score: number,  difficulty: string) => {

  try {
    const payload = {
      username,
      score,
      difficulty
    }
    const savePayload: AxiosResponse = await axios.post(
      baseUrl,
      payload
      )
    console.log('recieved payload from backend: ', savePayload)
    return savePayload
  } catch (error) {
    throw new Error(error)
  }
}