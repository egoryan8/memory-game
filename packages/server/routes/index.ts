import express, { Router } from 'express'
import { topicRouter } from './topics'
import { commentRouter } from './comments'
import { themeRouter } from './themes'

const apiRoutes = Router()

apiRoutes.use([express.json()])

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)
apiRoutes.use('/user-theme', themeRouter)

export { apiRoutes }
