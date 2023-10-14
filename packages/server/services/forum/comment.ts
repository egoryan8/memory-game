import type { Handler } from 'express'
import { Comment } from '../../models/forum/comment'

export const allComments: Handler = async (req, res) => {
  if (req.headers.cookie) {
    try {
      const comments = await Comment.findAll()

      if (comments) {
        res.status(200).json({ comments })
      } else {
        res.status(404).json({ reason: 'КОММЕНТАРИЕВ НЕТ!' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(403).json({ message: 'Пользователь не авторизован!' })
  }
}

export const createComment: Handler = async (req, res) => {
  if (req.headers.cookie && req.body) {
    const { topic_id, user_id, body } = req.body

    const post = await Comment.create({
      topic_id,
      user_id,
      body,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
