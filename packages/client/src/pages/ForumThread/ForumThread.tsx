import Navigation from '@/components/Navigation/Navigation'
import s from './ForumThread.module.scss'
import * as React from 'react'
import EmojiButton from '@/components/EmojiButton/EmojiButton'
import emojiConfig from '@/config/emojiConfig'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Comment } from 'server/models/forum/comment'

const ForumThread = () => {
  const { topicId } = useParams()

  const [topicName, setTopicName] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])

  const getData = async () => {
    try {
      const responseComments = await fetch(
        `http://localhost:9000/api/comments/${topicId}`
      )
      const responseTopic = await fetch(
        `http://localhost:9000/api/topics/${topicId}`
      )
      const jsonComments = await responseComments.json()
      const jsonTopic = await responseTopic.json()
      setComments(jsonComments.comments)
      setTopicName(jsonTopic.topic.title)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  console.log(topicName)

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={s.page}>
      <Navigation />

      <div className={s['forum-thread']}>
        <h1 className={s.title}>{topicName}</h1>
        <div>Комментарии:</div>
        <ul className={s.cards}>
          {comments.length
            ? comments.map(item => {
                const { id, body, likes, user_name, created_at } = item

                return (
                  <li className={s.card} key={id}>
                    <div className={s.avatarBlock}>
                      <div className={s.forumAvatar}>
                        {user_name.split('')[0]}
                      </div>
                      <div className={s.userName}>{user_name}</div>
                    </div>
                    <div className={s['message-block']}>
                      <p className={s.message}>{body}</p>
                      <div className={s.info}>
                        <p className={s.time}>
                          {new Date(created_at).toLocaleString()}
                        </p>
                        <EmojiButton
                          config={emojiConfig[0].config}
                          count={emojiConfig[0].count}
                          isSelected={emojiConfig[0].isSelected}
                        />
                      </div>
                    </div>
                  </li>
                )
              })
            : 'Комментариев нет'}
        </ul>
      </div>
    </div>
  )
}

export default ForumThread
