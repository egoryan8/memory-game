import express, { Router } from 'express'
import { topicRouter } from './topics'
import { commentRouter } from './comments'

const apiRoutes = Router()

apiRoutes.use([express.json()])

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)

export { apiRoutes }
