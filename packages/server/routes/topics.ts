import { Router } from 'express'
import { allTopics, addPost, getTopicById } from '../services/forum/topic'

const topicRouter = Router()

topicRouter.get('/', allTopics)
topicRouter.get('/:id', getTopicById)
topicRouter.post('/add', addPost)

export { topicRouter }
