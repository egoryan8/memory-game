import Button from '@/components/Button/Button'
import Navigation from '@/components/Navigation/Navigation'
import Title from '@/components/Title/Title'
import { declensionWords } from '@/utils/declensionWords'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as React from 'react'
import { Link } from 'react-router-dom'
import s from './Forum.module.scss'
import { ReactComponent as NoteIcon } from './note.svg'

const themesList = [
  {
    id: '1',
    theme: 'Requests',
    numberOfResponses: 1600,
    lastMessage: 'Read before you ask (again...)',
  },
  {
    id: '2',
    theme: 'Нашествие белок',
    numberOfResponses: 1324,
    lastMessage: 'Free Download Message Square',
  },
  {
    id: '3',
    theme: 'Поиск Жилья',
    numberOfResponses: 1,
    lastMessage: 'Promokod ererer4gbf',
  },
  {
    id: '4',
    theme: 'Нашествие белок',
    numberOfResponses: 1324,
    lastMessage: 'Free Download Message Square',
  },
]

const Forum = () => {
  const [value, setValue] = useState('')
  const [themes, setThemes] = useState(themesList)

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setThemes([
      ...themes,
      { id: uuidv4(), theme: value, numberOfResponses: 0, lastMessage: ' ' },
    ])
  }

  return (
    <div className={s.page}>
      <Navigation />

      <div className={s.forum}>
        <Title tag={'h1'} className={s.title}>
          Темы
        </Title>
        <form className={s.newTheme}>
          <input
            type="text"
            placeholder={'Новая тема'}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button className={s.btn} theme="blue" onClick={handleClick}>
            Создать
          </Button>
        </form>

        <ul className={s.container}>
          {themes.map(item => {
            const { id, theme, numberOfResponses, lastMessage } = item

            return (
              <li key={id}>
                <Link to={`/forum/thread/${id}`}>
                  <div className={s['topic-ico']}>
                    <NoteIcon />
                  </div>
                  <div className={s.details}>
                    <div className={s['topic-name']}>{theme}</div>
                    <div className={s['last-mess']}>{lastMessage}</div>
                  </div>
                  <div className={s.answers}>
                    {declensionWords(numberOfResponses, [
                      'ответ',
                      'ответа',
                      'ответов',
                    ])}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Forum
