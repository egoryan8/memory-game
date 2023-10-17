import { Router } from 'express'
import { allTopics, createPost, getTopicById } from '../services/forum/topic'

const topicRouter = Router()

topicRouter.get('/', allTopics)
topicRouter.get('/:id', getTopicById)
topicRouter.post('/create', createPost)

export { topicRouter }
