import express from 'express'
import messageController from '../controllers/message'

const router = express.Router()

router.get('/', messageController.getMessages)
router.post('/', messageController.createMessage)
router.delete('/', messageController.deleteMessages)

export = router