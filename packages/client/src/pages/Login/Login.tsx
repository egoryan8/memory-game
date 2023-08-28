import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import useStore from '@/store'

const Login: React.FC = () => {
  const [loginAsync] = useStore(s => [s.loginAsync])

  const onSubmit: SubmitHandler<ILogin> = (data, event) => {
    event?.preventDefault()
    console.log('LOGIN', data)
    loginAsync(data)
  }

  const inputNames = ['login', 'password']

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ</h1>
      <Form
        inputTypes={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="login"
      />
      <Link to="/register">Регистрация</Link>
    </div>
  )
}

export default Login
