import Button from '@/components/Button/Button'
import Navigation from '@/components/Navigation/Navigation'
import s from './ForumThread.module.scss'
import * as React from 'react'

const ForumThread = () => {
  return (
    <div className={s.page}>
      <Navigation />

      <div className={s['forum-thread']}>
        <h1 className={s.title}> Requests </h1>
        <form className={s['send-message']}>
          <input type="text" placeholder={'Новая тема'} />
          <Button className={s.btn}>отправить</Button>
        </form>

        <ul className={s.cards}>
          <li className={s.card}>
            <div className={s.avatarBlock}>
              <div className={s.avatar}></div>
              <div className={s.userName}>Practicum Ya</div>
            </div>
            <div className={s['message-block']}>
              <p className={s.message}>
                Многие думают, что Lorem Ipsum - взятый с потолка
                псевдо-латинский набор слов, но это не совсем так. Его корни
                уходят в один фрагмент классической латыни 45 года н.э., то есть
                более двух тысячелетий назад.
              </p>
              <p className={s.time}>18 августа, 2023</p>
            </div>
          </li>

          <li className={s.card}>
            <div className={s.avatarBlock}>
              <div className={`${s.avatar} ${s.avatarPurple}`}></div>
              <div className={s.userName}>Шуфутинский</div>
            </div>
            <div className={s['message-block']}>
              <p className={s.message}>
                Я календарь переверну — и снова третье сентября. На фото я твое
                взгляну — и снова третье сентября. Но почему, но почему
                расстаться все же нам пришлось? Ведь было все у нас всерьез
                второго сентября. Но почему, но почему расстаться все же нам
                пришлось? Ведь было все у нас всерьез второго сентября.
              </p>
              <p className={s.time}>3 сентября, 2023</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ForumThread
