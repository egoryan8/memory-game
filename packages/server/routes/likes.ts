import { Router } from 'express'
import { allLikes } from '../services/forum/likes'

const likeRouter = Router()

likeRouter.get('/', allLikes)

export { likeRouter }
