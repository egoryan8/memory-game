import Button from '@/components/Button/Button'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import s from './ChangePassword.module.scss'
import UserApi from '@/api/UserApi'
import { AppPath } from '@/types/AppPath'

const ChangePassword: React.FC = () => {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<IPassword> = async data => {
    await UserApi.editPassword(data)
    navigate(AppPath.PROFILE)
  }

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
      <Link className={s.link} to="/profile">
        <Button theme={'orange'}>Назад</Button>
      </Link>
    </div>
  )
}

export default ChangePassword
