import React from 'react'
import Input from '@/components/Input/Input'
import { inputsData } from './constants'
import { Link } from 'react-router-dom'
import { useFormInput } from '@/hooks/useFormInput/useFormInput'

interface ILogin {
  login: string
  password: string
}

const Login: React.FC = () => {
  const { inputValue, handleInputChange } = useFormInput<ILogin>({
    login: '',
    password: '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('LOGIN', inputValue)
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
            value={inputValue[item.id as keyof ILogin]}
            onChange={handleInputChange}
            key={item.id}
          />
        ))}
        <div className="button-link-container">
          <button type="submit">Войти</button>
          <Link to="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
