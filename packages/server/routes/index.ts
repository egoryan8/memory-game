import express, { Router } from 'express'
import { topicRouter } from './topics'
import { commentRouter } from './comments'
import { replyRouter } from './replies'
import { themeRouter } from './themes'
import { likeRouter } from './likes'
import { checkAuth } from '../middlewares/checkAuth'

const apiRoutes = Router()

apiRoutes.use([express.json()], checkAuth)

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)
apiRoutes.use('/replies', replyRouter)
apiRoutes.use('/likes', likeRouter)
apiRoutes.use('/user-theme', themeRouter)

export { apiRoutes }
