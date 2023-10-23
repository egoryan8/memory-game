import { Router } from 'express'
import { commentsByTopicId, addComment } from '../services/forum/comment'

const commentRouter = Router()

commentRouter.get('/:topicId', commentsByTopicId)
commentRouter.post('/add', addComment)

export { commentRouter }
