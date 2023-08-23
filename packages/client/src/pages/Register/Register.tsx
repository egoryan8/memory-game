import React from 'react'
import Input from '@/components/Input/Input'
import { RegisterInputsData } from './constants'
import { Link } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { validationRules } from '@/utils/validation'

interface IRegister {
  first_name: string
  last_name: string
  login: string
  email: string
  phone: string
  password: string
}

const Register: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<IRegister>()

  const onSubmit: SubmitHandler<IRegister> = data => {
    console.log('REGISTER', data)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">РЕГИСТРАЦИЯ</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {RegisterInputsData.map(item => (
          <Controller
            key={item.id}
            name={item.id as keyof IRegister}
            control={control}
            rules={validationRules[item.id as keyof typeof validationRules]}
            render={({ field }) => (
              <Input
                id={item.id}
                name={item.name}
                label={item.label}
                type={item.type}
                onChange={event => field.onChange(event.target.value)}
                onBlur={field.onBlur}
                error={formState.errors[item.id as keyof IRegister]?.message}
                required={item.required}
              />
            )}
          />
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
