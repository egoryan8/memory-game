import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'

interface ILogin {
  login: string
  password: string
}

const Login: React.FC = () => {
  const onSubmit: SubmitHandler<ILogin> = data => {
    console.log('LOGIN', data)
  }

  const inputNames = ['login', 'password']

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ</h1>
      <Form
        inputsData={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="login"
      />
      <Link to="/register">Регистрация</Link>
    </div>
  )
}

export default Login
