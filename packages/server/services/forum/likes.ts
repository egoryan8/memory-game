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
