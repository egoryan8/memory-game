import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import { declensionWords } from '@/utils/declensionWords'
import { Link } from 'react-router-dom'
import s from './Forum.module.scss'
import { Topic } from 'server/models/forum/topic'
import noteIcon from './note.svg'

const Forum = () => {
  const [topics, setTopics] = useState<Topic[]>([])

  const getData = async () => {
    try {
      const responseTopics = await fetch('http://localhost:9000/api/topics')
      const responseComments = await fetch('http://localhost:9000/api/comments')
      const jsonTopics = await responseTopics.json()
      const jsonComments = await responseComments.json()
      setTopics(jsonTopics.topics)
      console.log(jsonComments)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(topics, 'DATA')
  }, [topics])

  return (
    <div className={s.page}>
      <Navigation />
      <div className={s.forum}>
        <h1 className={s.title}>Темы</h1>
        <div className={s.container}>
          {topics.map(item => {
            const { id, title, body, comments, user_name, created_at } = item

            return (
              <div className={s.topic} key={id}>
                <div className={s.topicBody}>
                  <h3>
                    <img src={noteIcon} alt={'Topic ' + id} />
                    {title}
                  </h3>
                  <div className={s.bodyText}>{body}</div>
                  {comments[0]?.body && (
                    <div className={s.lastComment}>
                      <b>
                        {comments[0].user_name}{' '}
                        {new Date(comments[0].created_at).toLocaleString()}{' '}
                        ответил(а):{' '}
                      </b>
                      {comments[0].body}
                    </div>
                  )}
                  <Link to={`/forum/thread/${id}`}>Все комментарии...</Link>
                  <div className={s.topicCreated}>
                    <b>Автор топика: </b>
                    {user_name} | <b>Дата создания: </b>
                    {new Date(created_at).toLocaleString()}
                  </div>
                </div>
                <div className={s.commentsCount}>
                  {declensionWords(comments.length, [
                    'ответ',
                    'ответа',
                    'ответов',
                  ])}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Forum
