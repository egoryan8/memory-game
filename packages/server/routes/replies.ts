import { Router } from 'express'
import { addReply } from '../services/forum/reply'

const replyRouter = Router()

replyRouter.post('/add', addReply)

export { replyRouter }
