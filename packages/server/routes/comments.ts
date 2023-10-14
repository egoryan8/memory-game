import { Router } from 'express'
import { allComments, createComment } from '../services/forum/comment'

const commentRouter = Router()

commentRouter.get('/', allComments)
commentRouter.post('/create', createComment)

export { commentRouter }
