import React from 'react'
import Input from '@/components/Input/Input'
import { inputsData } from './constants'
import { Link } from 'react-router-dom'
import { useFormInput } from '@/hooks/useFormInput/useFormInput'

interface IRegister {
  first_name: string
  last_name: string
  login: string
  email: string
  phone: string
  password: string
}

const Register: React.FC = () => {
  const { inputValue, handleInputChange } = useFormInput<IRegister>({
    first_name: '',
    last_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('REGISTER', inputValue)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">РЕГИСТРАЦИЯ</h1>
      <form className="form" onSubmit={handleSubmit}>
        {inputsData.map(item => (
          <div className="input-wrapper" key={item.id}>
            <Input
              id={item.id}
              name={item.name}
              label={item.label}
              type={item.type}
              value={inputValue[item.id as keyof IRegister]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div className="button-link-container">
          <button type="submit">Зарегистрироваться</button>
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
