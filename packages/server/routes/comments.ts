import { Router } from 'express'
import {
  allComments,
  commentsByTopicId,
  createComment,
} from '../services/forum/comment'

const commentRouter = Router()

commentRouter.get('/', allComments)
commentRouter.get('/:topicId', commentsByTopicId)
commentRouter.post('/create', createComment)

export { commentRouter }
