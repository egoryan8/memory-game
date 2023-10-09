import Button from '@/components/Button/Button'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './FormContainer.module.scss'

interface FormContainerProps {
  children: ReactNode
  contentType: 'login' | 'register'
}

const FormContainer = ({ children, contentType }: FormContainerProps) => {
  const isLogin = contentType === 'login'

  return (
    <div className={s.container}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      {children}
      <div className={s.nav}>
        <span>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</span>
        <Link to={isLogin ? '/register' : '/login'}>
          <Button theme="orange" type="button" className={s.btn}>
            {isLogin ? 'Создать' : 'Войти'}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FormContainer
