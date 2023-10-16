import type { Handler } from 'express'
import { Topic } from '../../models/forum/topic'
import { Comment } from '../../models/forum/comment'

export const allTopics: Handler = async (_req, res) => {
  try {
    const topics = await Topic.findAll({
      include: Comment,
    })
    if (topics) {
      res.status(200).json({ topics })
    } else {
      res.status(404).json({ reason: 'ТОПИКОВ НЕТ!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getTopicById: Handler = async (req, res) => {
  const { id } = req.params

  try {
    const topic = await Topic.findByPk(id)

    if (topic) {
      res.status(200).json({ topic })
    } else {
      res.status(404).json({ error: 'Топик не найден' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createPost: Handler = async (req, res) => {
  if (req.body) {
    const { title, body, user_id } = req.body

    const post = await Topic.create({
      title,
      body,
      user_id,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
