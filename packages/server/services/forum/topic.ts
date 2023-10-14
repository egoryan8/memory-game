import type { Handler } from 'express'
import { Topic } from '../../models/forum/topic'

export const allTopics: Handler = async (req, res) => {
  if (req.headers.cookie) {
    try {
      const topics = await Topic.findAll()

      if (topics) {
        res.status(200).json({ topics })
      } else {
        res.status(404).json({ reason: 'ТОПИКОВ НЕТ!' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(403).json({ message: 'Пользователь не авторизован!' })
  }
}

export const createPost: Handler = async (req, res) => {
  if (req.headers.cookie && req.body) {
    const { body, user_id } = req.body

    const post = await Topic.create({
      body,
      user_id,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
