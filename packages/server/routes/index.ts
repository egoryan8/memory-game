import express, { Router } from 'express'
import { topicRouter } from './topics'
import { commentRouter } from './comments'
import { likeRouter } from './likes'
import { checkAuth } from '../middlewares/checkAuth'

const apiRoutes = Router()

apiRoutes.use([express.json()], checkAuth)

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)
apiRoutes.use('/likes', likeRouter)

export { apiRoutes }
