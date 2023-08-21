import React, { ChangeEvent, useState } from 'react'
import CInput from '../../components/CInput/CInput'
import { inputsData } from './constants'
import { InputValue } from '../../components/CInput/types'

const PSignIn: React.FC = () => {
  const [inputValue, setInputValue] = useState<InputValue>({
    login: '',
    password: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue(prevInputValue => ({
      ...prevInputValue,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('SUBMIT', inputValue.login, inputValue.password)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ В ИГРУ</h1>
      <form className="form" onSubmit={handleSubmit}>
        {inputsData.map(item => (
          <CInput
            id={item.id}
            label={item.label}
            type={item.type}
            value={inputValue[item.id as keyof InputValue]}
            onChange={handleInputChange}
            key={item.id}
          />
        ))}
        <button type="submit">Войти</button>
        <a className="display-block" href="#">
          Регистрация
        </a>
      </form>
    </div>
  )
}

export default PSignIn
