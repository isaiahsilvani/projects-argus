import axios, { AxiosResponse } from 'axios'

const baseUrl: any = 'http://localhost:1338/api/messages/'

interface ApiRequest {
  baseUrl: string,
  payload: string;
}

export const saveMsgRequest = async (message: any) => {
  console.log(message.length)
  console.log('save message api request hit----', message)
  if(message.length !== 0) {
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
  return []
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

export const deleteMessages = async () => {
  try{
    await axios.delete(baseUrl)
  } catch (error) {
    throw new Error(error)
  }
}