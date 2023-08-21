import React, { ChangeEvent, useState } from 'react'

const PSignIn: React.FC = () => {
  /** Local data */
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  /** Handlers */
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('SUBMIT', username, password)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ В ИГРУ</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Имя пользователя</label>
          <input
            type="text"
            id="login"
            value={username}
            onChange={handleLoginChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Войти</button>
        {/*Заменить на Link после добавления роутера*/}
        <a className="display-block" href="#">
          Регистрация
        </a>
      </form>
    </div>
  )
}

export default PSignIn
