import { Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import Message from '../models/message'

const deleteMessages = (req: Request, res: Response, next: NextFunction) => {
  // delete messages, then replace it.
  Message.deleteMany()
  .then(()=> {
    console.log('messages deleted!!!')
    // create message delete in database
    res.status(200)
  })
  .catch((error) => {
    return res.status(500).json({
      message: error.message,
      error
    })
  })
}

const getMessages = (req: Request, res: Response, next: NextFunction) => {
  Message.find()
  .exec()
  .then(results => {
    if(results){
      return res.status(200).json({
        messages: results
      })
    } else {
      return res.status(200)
    }
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
  console.log('is username === to admin?', username === true)
  if (username !== "admin") {
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
}

export default {
  getMessages,
  createMessage,
  deleteMessages
}