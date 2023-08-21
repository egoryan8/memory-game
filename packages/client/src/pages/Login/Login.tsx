import React, { ChangeEvent, useState } from 'react'
import Input from '@/components/Input/Input'
import { inputsData } from './constants'

interface InputStateValue {
  login: string
  password: string
}

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState<InputStateValue>({
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
    console.log('SUBMIT', inputValue)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ В ИГРУ</h1>
      <form className="form" onSubmit={handleSubmit}>
        {inputsData.map(item => (
          <Input
            id={item.id}
            name={item.name}
            label={item.label}
            type={item.type}
            value={inputValue[item.id as keyof InputStateValue]}
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

export default Login
