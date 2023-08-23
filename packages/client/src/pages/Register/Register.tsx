import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'

interface IRegister {
  first_name: string
  last_name: string
  login: string
  email: string
  phone: string
  password: string
}

const Register: React.FC = () => {
  const onSubmit: SubmitHandler<IRegister> = data => {
    console.log('REGISTER', data)
  }

  const inputNames = Object.keys(INPUTS_DATA)

  return (
    <div className="page-container">
      <h1 className="text-align-center">РЕГИСТРАЦИЯ</h1>
      <Form
        inputsData={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="register"
      />
      <Link to="/login">Войти</Link>
    </div>
  )
}

export default Register
