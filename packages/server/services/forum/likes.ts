import type { Handler } from 'express'
import { Like } from '../../models/forum/like'

export const allLikes: Handler = async (_req, res) => {
  try {
    const likes = await Like.findAll()

    if (likes) {
      res.status(200).json({ likes })
    } else {
      res.status(404).json({ reason: 'ЛАЙКОВ НЕТ!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const addLike: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { comment_id, emoji } = req.body

    const like = await Like.create({
      comment_id,
      user_id: user.id,
      emoji,
    })

    res.status(200).json(like)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
