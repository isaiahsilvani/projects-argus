import { Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import Message from '../models/message'

const getMessages = (req: Request, res: Response, next: NextFunction) => {
  Message.find()
  .exec()
  .then(results => {
    return res.status(200).json({
      messages: results
    })
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    })
  })
}

const createMessage = (req: Request, res: Response, next: NextFunction) => {
  console.log('create message hit', req.body)
  let { message, username } = req.body

  const newMessage = new Message({
    _id: new mongoose.Types.ObjectId(),
    message,
    username
  })

  return newMessage.save()
  .then((result) => {
    console.log('message created --', result)
    return res.status(201).json({
      message: result
    })
  })
}

export default {
  getMessages,
  createMessage
}