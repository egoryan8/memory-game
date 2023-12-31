import type { Handler } from 'express'
import { Like } from '../../models/forum/like'

export const getLikesById: Handler = async (req, res) => {
  const { topicId, commentId, replyId } = req.params

  try {
    const id: {
      topic_id?: string
      comment_id?: string
      reply_id?: string
    } = {}

    if (topicId) {
      id.topic_id = topicId
    }

    if (commentId) {
      id.comment_id = commentId
    }

    if (replyId) {
      id.reply_id = replyId
    }

    if (Object.keys(id).length === 0) {
      res.status(400).json({ error: 'Не указан ни один Id' })
      return
    }

    const likes = await Like.findAll({
      where: id,
      order: [['id', 'ASC']],
    })

    if (likes) {
      res.status(200).json({ likes })
    } else {
      res.status(404).json({ reason: 'Лайков нет' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const addLike: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { topic_id, comment_id, reply_id, emoji } = req.body

    const existingLike = await Like.findOne({
      where: {
        topic_id,
        comment_id,
        reply_id,
        user_id: user.id,
        emoji,
      },
    })

    if (existingLike) {
      res.status(200).json(existingLike)
    } else {
      const like = await Like.create({
        topic_id,
        comment_id,
        reply_id,
        user_id: user.id,
        emoji,
      })

      res.status(200).json(like)
    }
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}

export const removeLike: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { topic_id, comment_id, reply_id, emoji } = req.body

    await Like.destroy({
      where: {
        topic_id,
        comment_id,
        reply_id,
        user_id: user.id,
        emoji,
      },
    })

    res.status(200).json({ message: 'Лайк удален' })
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
