import { Router } from 'express'
import { addLike, removeLike } from '../services/forum/likes'

const likeRouter = Router()

likeRouter.post('/add', addLike)
likeRouter.post('/remove', removeLike)

export { likeRouter }
