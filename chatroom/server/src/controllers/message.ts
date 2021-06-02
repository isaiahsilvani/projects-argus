import { Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import Message from '../models/message'

const getMessages = (req: Request, res: Response, next: NextFunction) => {
  console.log('get messages hit')
}

const createMessage = (req: Request, res: Response, next: NextFunction) => {
  console.log('create message hit')
}

export default {
  getMessages,
  createMessage
}