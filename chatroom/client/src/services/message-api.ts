import axios, { AxiosResponse } from 'axios'

const baseUrl: any = 'http://localhost:1337/api/messages/'

interface ApiRequest {
  baseUrl: string,
  payload: string;
}

export const saveMsgRequest = async (message: any) => {
  console.log('saveMsg hit', message[0].message, message[0].username)
  const payload = {
    username: message[0].username,
    message: message[0].message
  }
  try {
    console.log('send payload: ', payload)
    const savePayload: AxiosResponse<ApiRequest> = await axios.post(
      baseUrl,
      payload
      )
    return savePayload
  } catch (error) {
    throw new Error(error)
  }
}

export const getMsgsRequest = async () => {
  console.log('get Mesg Requesttt')
  try {

    const payload: AxiosResponse<ApiDataType> = await axios.get(baseUrl)

    console.log('recieved payload in services api: ', payload.data.messages)
    return await payload.data.messages as any

  } catch (error) {
    throw new Error(error)
  }
}