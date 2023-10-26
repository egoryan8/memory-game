import { Router } from 'express'
import { getCommentsByTopicId, addComment } from '../services/forum/comment'

const commentRouter = Router()

commentRouter.get('/:topicId', getCommentsByTopicId)
commentRouter.post('/add', addComment)

export { commentRouter }
