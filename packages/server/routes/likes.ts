import { Router } from 'express'
import { addLike, allLikes } from '../services/forum/likes'

const likeRouter = Router()

likeRouter.get('/', allLikes)
likeRouter.get('/add', addLike)

export { likeRouter }
