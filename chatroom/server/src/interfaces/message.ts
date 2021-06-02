import { Document } from 'mongoose'

export default interface IMessage extends Document {
  username: string,
  message: string,
  time: string
}