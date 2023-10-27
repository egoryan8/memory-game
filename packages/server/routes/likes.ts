import { Router } from 'express'
import { addLike, removeLike, getLikesById } from '../services/forum/likes'

const likeRouter = Router()

likeRouter.get('/topic/:topicId', getLikesById)
likeRouter.get('/comment/:commentId', getLikesById)
likeRouter.get('/reply/:replyId', getLikesById)
likeRouter.post('/add', addLike)
likeRouter.post('/remove', removeLike)

export { likeRouter }
