import type { Handler } from 'express'
import { Reply } from '../../models/forum/reply'

export const addReply: Handler = async (req, res) => {
  const user = res.locals.user

  if (req.body) {
    const { body, topic_id, comment_id, reply_id } = req.body

    const post = await Reply.create({
      body,
      topic_id,
      comment_id,
      reply_id,
      user_id: user.id,
      user_name: `${user.first_name} ${user.second_name}`,
    })

    res.status(200).json(post)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
