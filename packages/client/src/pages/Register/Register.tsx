import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import register from '@/store/asyncActions/auth/register'

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IUser> = data => dispatch(register(data))
  const inputNames = Object.keys(INPUTS_DATA).filter(
    item => item !== 'oldPassword' && item !== 'newPassword'
  )

  return (
    <div className="page-container">
      <h1 className="text-align-center">РЕГИСТРАЦИЯ</h1>
      <Form
        inputTypes={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="register"
      />
      <Link to="/login">Войти</Link>
    </div>
  )
}

export default Register
