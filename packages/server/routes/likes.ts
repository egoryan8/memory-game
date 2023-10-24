import { Router } from 'express'
import {
  getLikesByCommentOrReplyId,
  addLike,
  removeLike,
} from '../services/forum/likes'

const likeRouter = Router()

likeRouter.get('/reply/:replyId', getLikesByCommentOrReplyId)
likeRouter.get('/comment/:commentId', getLikesByCommentOrReplyId)
likeRouter.post('/add', addLike)
likeRouter.post('/remove', removeLike)

export { likeRouter }
