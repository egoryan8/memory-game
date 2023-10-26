import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import s from './Forum.module.scss'
import { Topic } from 'server/models/forum/topic'
import { Spinner } from '@/components/Spinner/Spinner'
import Button from '@/components/Button/Button'
import sendReplyIcon from '@/pages/ForumThread/sendReplyIcon.svg'
import { getCurrentDate } from '@/utils/currentDate'
import { textareaHeightAutoResize } from '@/utils/textareaHeightAutoResize'

export const FormattedBodyText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n')
  const formattedText = lines.map((line, index) =>
    line.trim().length ? <p key={index}>{line.trim()}</p> : <br key={index} />
  )

  return <div className={s.message}>{formattedText}</div>
}

const Forum: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const [newTopic, setNewTopic] = useState({ title: '', body: '' })

  const initialTextareaHeight = 'auto'

  const getData = async () => {
    try {
      const responseTopics = await fetch('http://localhost:9000/api/topics')
      const jsonTopics = await responseTopics.json()
      setTopics(jsonTopics.topics)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:9000/api/topics/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTopic.title.trim(),
          body: newTopic.body.trim(),
        }),
      })

      if (response.ok) {
        getData().then(() => {
          setNewTopic({ title: '', body: '' })
        })
        const textarea = document.querySelector('textarea')
        if (textarea) {
          textarea.style.height = initialTextareaHeight
        }
      } else {
        console.error('Не удалось создать новый топик')
      }
    } catch (error) {
      console.error('Ошибка при публикации топика:', error)
    }
  }

  const showFormHandler = useCallback(() => setShowForm(!showForm), [showForm])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="page">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="content-wrapper">
          <div className={s.topicTitle}>
            <h1>Топики форума</h1>
            <Button onClick={showFormHandler}>
              {showForm ? 'Отменить' : '+ Новый топик'}
            </Button>
          </div>
          {showForm && (
            <form className={s.topicForm} onSubmit={submitForm}>
              <input
                type="text"
                placeholder="Тема топика..."
                value={newTopic.title}
                onChange={event =>
                  setNewTopic({
                    ...newTopic,
                    title: event.target.value.replace(/^\s+/, ''),
                  })
                }
              />
              <textarea
                value={newTopic.body}
                onInput={textareaHeightAutoResize}
                onChange={event =>
                  setNewTopic({
                    ...newTopic,
                    body: event.target.value.replace(/^\s+/, ''),
                  })
                }
                rows={3}
                placeholder="Описание..."
              />
              <Button
                className={s.submitButton}
                type="submit"
                disabled={!newTopic.body || !newTopic.title}>
                <img
                  src={sendReplyIcon}
                  alt="Reply Icon"
                  title="Создать топик"
                />
              </Button>
            </form>
          )}
          <div className={s.container}>
            {topics.length ? (
              topics.map(item => {
                const { id, title, body, comments, user_name, created_at } =
                  item
                return (
                  <div className={s.topic} key={id}>
                    <div className={s.topicBody}>
                      <div className={s.topicCreated}>
                        <div>
                          <b>Автор топика: </b>
                          {user_name}
                        </div>
                        <div>
                          <b>Дата создания: </b>
                          <span className={s.date}>
                            {getCurrentDate(created_at)}
                          </span>
                        </div>
                        <div>
                          <b>💬 </b>
                          <span className={s.date}>{comments.length}</span>
                        </div>
                      </div>
                      <Link className={s.titleLink} to={`/forum/thread/${id}`}>
                        <h3>{title}</h3>
                      </Link>
                      <FormattedBodyText
                        text={`${body.substring(0, 300)}...`}
                      />
                      <Link to={`/forum/thread/${id}`}>Читать дальше</Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <b>Топиков еще нет</b>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Forum
