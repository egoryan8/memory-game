import type { Handler } from 'express'
import { Like } from '../../models/forum/like'

export const addLike: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { comment_id, reply_id, emoji } = req.body

    const existingLike = await Like.findOne({
      where: {
        comment_id,
        reply_id,
        user_id: user.id,
      },
    })

    if (existingLike) {
      existingLike.emoji = emoji
      await existingLike.save()
      res.status(200).json(existingLike)
    } else {
      const like = await Like.create({
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
    const { comment_id, reply_id } = req.body

    await Like.destroy({
      where: {
        comment_id,
        reply_id,
        user_id: user.id,
      },
    })

    res.status(200).json({ message: 'Лайк удален' })
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
