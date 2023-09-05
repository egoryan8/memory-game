import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import login from '@/store/asyncActions/auth/login'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ILogin> = data => dispatch(login(data))
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
