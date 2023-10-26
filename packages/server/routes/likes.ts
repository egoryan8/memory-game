import { Router } from 'express'
import {
  getLikesByCommentOrReplyId,
  addLike,
  removeLike,
} from '../services/forum/likes'

const likeRouter = Router()

likeRouter.get('/topic/:topicId', getLikesByCommentOrReplyId)
likeRouter.get('/comment/:commentId', getLikesByCommentOrReplyId)
likeRouter.get('/reply/:replyId', getLikesByCommentOrReplyId)
likeRouter.post('/add', addLike)
likeRouter.post('/remove', removeLike)

export { likeRouter }
