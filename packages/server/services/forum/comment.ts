import type { Handler } from 'express'
import { Comment } from '../../models/forum/comment'
import { Sequelize } from 'sequelize-typescript'
import { Reply } from '../../models/forum/reply'

export const getCommentsByTopicId: Handler = async (req, res) => {
  const topicId = req.params.topicId

  try {
    const comments = await Comment.findAll({
      where: { topic_id: topicId },
      order: [
        [Sequelize.col('created_at'), 'DESC'],
        [{ model: Reply, as: 'replies' }, 'created_at', 'ASC'],
      ],
      include: [{ model: Reply }],
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

export const addComment: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { topic_id, body, img_url } = req.body

    const post = await Comment.create({
      topic_id,
      user_id: user.id,
      user_name: `${user.first_name} ${user.second_name}`,
      body,
      img_url,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
