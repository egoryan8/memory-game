import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Input from '@/components/Input/Input'
import { LoginInputsData } from './constants'
import { Link } from 'react-router-dom'
import { validationRules } from '@/utils/validation'

interface ILogin {
  login: string
  password: string
}

const Login: React.FC = () => {
  const { control, handleSubmit, formState } = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = data => {
    console.log('LOGIN', data)
  }

  return (
    <div className="page-container">
      <h1 className="text-align-center">ВОЙТИ В ИГРУ</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {LoginInputsData.map(item => (
          <Controller
            key={item.id}
            name={item.id as keyof ILogin}
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
                error={formState.errors[item.id as keyof ILogin]?.message}
                required={item.required}
              />
            )}
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
