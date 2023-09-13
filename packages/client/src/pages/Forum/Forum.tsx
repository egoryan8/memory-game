import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Navigation from '@/components/Navigation/Navigation'
import { forumThemesConfig } from '@/config/forumThemesConfig'
import { declensionWords } from '@/utils/declensionWords'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as React from 'react'
import { Link } from 'react-router-dom'
import s from './Forum.module.scss'
import { ReactComponent as NoteIcon } from './note.svg'

const Forum = () => {
  const [value, setValue] = useState('')
  const [themes, setThemes] = useState(forumThemesConfig)

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setThemes([
      ...themes,
      { id: uuidv4(), theme: value, numberOfResponses: 0, lastMessage: ' ' },
    ])

    setValue('')
  }

  return (
    <div className={s.page}>
      <Navigation />

      <div className={s.forum}>
        <h1 className={s.title}>Темы</h1>

        <form className={s.newTheme}>
          <Input
            id={'new-theme'}
            name={'new-theme'}
            type={'text'}
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder={'Новая тема'}
          />
          <Button className={s.btn} onClick={handleClick}>
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
