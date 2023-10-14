import { Router } from 'express'
import { allTopics, createPost } from '../services/forum/topic'

const topicRouter = Router()

topicRouter.get('/', allTopics)
topicRouter.post('/create', createPost)

export { topicRouter }
