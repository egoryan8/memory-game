import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import { declensionWords } from '@/utils/declensionWords'
import { Link } from 'react-router-dom'
import s from './Forum.module.scss'
import { Topic } from 'server/models/forum/topic'
import answerIcon from './answers.svg'
import { Spinner } from '@/components/Spinner/Spinner'
import Button from '@/components/Button/Button'

const Forum: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [newTopic, setNewTopic] = useState({ title: '', body: '' })
  const formClass = showForm ? s.slideDown : s.slideUp

  console.log(formClass)

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

  const showFormHandler = () => setShowForm(!showForm)

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:9000/api/topics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTopic),
      })

      if (response.ok) {
        getData().then(() => {
          setNewTopic({ title: '', body: '' })
          setShowForm(false)
        })
      } else {
        console.error('Не удалось создать новый топик')
      }
    } catch (error) {
      console.error('Ошибка при публикации топика:', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="page">
      <Navigation />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="content-wrapper">
          <h1>Топики форума</h1>
          <Button onClick={showFormHandler}>
            {!showForm ? 'Создать топик' : 'Отмена'}
          </Button>
          <form className={`${s.topicForm} ${formClass}`} onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Заголовок"
              value={newTopic.title}
              onChange={event =>
                setNewTopic({ ...newTopic, title: event.target.value })
              }
            />
            <textarea
              placeholder="Сообщение"
              value={newTopic.body}
              onChange={event =>
                setNewTopic({ ...newTopic, body: event.target.value })
              }
            />
            <Button
              className={s.submitButton}
              theme="orange"
              type="submit"
              disabled={!newTopic.body || !newTopic.title}>
              Создать топик
            </Button>
          </form>
          <div className={s.container}>
            {topics.map(item => {
              const { id, title, body, comments, user_name, created_at } = item

              return (
                <div className={s.topic} key={id}>
                  <div className={s.topicBody}>
                    <div>
                      <h3>{title}</h3>
                      <div className={s.topicCreated}>
                        <div>
                          <b>Автор топика: </b>
                          {user_name}
                        </div>
                        |
                        <div>
                          <b>Дата создания: </b>
                          {new Date(created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className={s.bodyText}>{body}</div>
                    <Link to={`/forum/thread/${id}`}>
                      <img src={answerIcon} alt={'Answer ' + id} />
                      {comments.length
                        ? declensionWords(comments.length, [
                            'комментарий',
                            'комментария',
                            'комментариев',
                          ])
                        : 'Оставить первый комментарий'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Forum
