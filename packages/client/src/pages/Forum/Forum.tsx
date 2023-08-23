import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Navigation from '@/components/Navigation/Navigation'
import Title from '@/components/Title/Title'
import { useState } from 'react'
import * as React from 'react'
import s from './Forum.module.scss'
import { ReactComponent as ThemeIcon } from './theme.svg'
import { ReactComponent as AnswersIcon } from './answers.svg'

const themesList = [
  { id: 1, theme: 'Тема 1', numberOfResponses: 46, lastMessage: 'as usual' },
  { id: 2, theme: 'Тема 2', numberOfResponses: 43, lastMessage: 'normally' },
  {
    id: 3,
    theme: 'Тема 3',
    numberOfResponses: 2,
    lastMessage: 'somewhere out there',
  },
]

const Forum = () => {
  const [showInput, setShowInput] = useState(false)

  const handleClick = () => {
    setShowInput(!showInput)
  }

  return (
    <>
      <Navigation />

      <div style={{ background: '#CFD3D9', width: '100%', padding: '48px' }}>
        <Title tag={'h1'} className={s.title}>
          Форум
        </Title>
        <div className={s.newTheme}>
          {showInput && (
            <Input
              id="chat-topic"
              name="chat-topic"
              label="Создать тему:"
              type={'text'}
              value={''}
              onChange={() => console.log('12')}
            />
          )}
          <Button className={s.btn} theme="blue" onClick={handleClick}>
            {!showInput ? 'Создать тему' : 'Создать'}
          </Button>
        </div>

        <div className={s.container}>
          <div className={s.headings}>
            <div>
              <ThemeIcon />
              тема
            </div>
            <div>
              <AnswersIcon />
              ответов
            </div>
            <div>последнее сообщение</div>
          </div>
          <ul>
            {themesList.map(({ id, theme, numberOfResponses, lastMessage }) => (
              <li key={id}>
                <div>{theme}</div>
                <div>{numberOfResponses}</div>
                <div>{lastMessage}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Forum
