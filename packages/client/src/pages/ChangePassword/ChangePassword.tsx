import React from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import useStore from '@/store'

const ChangePassword: React.FC = () => {
  const [editPasswordAsync] = useStore(store => [store.editPasswordAsync])
  const onSubmit: SubmitHandler<IPassword> = async data =>
    editPasswordAsync(data)

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
