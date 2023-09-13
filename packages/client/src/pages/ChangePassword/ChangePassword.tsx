import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import editPassword from '@/store/asyncActions/users/editPassword'

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IPassword> = data =>
    dispatch(editPassword(data))

  const inputNames = ['oldPassword', 'newPassword']

  return (
    <div className="page-container">
      <h1 className="text-align-center">СМЕНИТЬ ПАРОЛЬ</h1>
      <Form
        inputTypes={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="edit_profile"
      />
      <Link to="/profile">Назад</Link>
    </div>
  )
}

export default ChangePassword
