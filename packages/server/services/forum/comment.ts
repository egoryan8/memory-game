import type { Handler } from 'express'
import { Comment } from '../../models/forum/comment'
import { Like } from '../../models/forum/like'
import { Sequelize } from 'sequelize-typescript'

export const allComments: Handler = async (_req, res) => {
  try {
    const comments = await Comment.findAll({
      include: Like,
    })

    if (comments) {
      res.status(200).json({ comments })
    } else {
      res.status(404).json({ reason: 'КОММЕНТАРИЕВ НЕТ!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const commentsByTopicId: Handler = async (req, res) => {
  const topicId = req.params.topicId

  try {
    const comments = await Comment.findAll({
      where: { topic_id: topicId },
      order: [[Sequelize.col('created_at'), 'DESC']],
      include: Like,
    })

    if (comments) {
      res.status(200).json({ comments })
    } else {
      res.status(404).json({ reason: 'Комментариев для данного топика нет' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

export const createComment: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { topic_id, body } = req.body

    const post = await Comment.create({
      topic_id,
      user_id: user.id,
      user_name: `${user.first_name} ${user.second_name}`,
      body,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}