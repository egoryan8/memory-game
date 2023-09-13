import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import DefaultAvatar from '@/assets/images/default-avatar-icon.svg'
import { BASE_URI } from '@/utils/HTTPClient'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import updateProfile from '@/store/asyncActions/users/updateProfile'
import editAvatar from '@/store/asyncActions/users/editAvatar'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/features/userSlice'

interface IProfile {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

const Profile: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const [editProfile, setEditProfile] = useState<boolean>(true)
  const [avatar, setAvatar] = useState<File | undefined>()

  const handleEditProfile = () => setEditProfile(!editProfile)

  const handleFormOnSubmit: SubmitHandler<IProfile> = data => {
    const { login, email, ...rest } = data

    const updatedData: IUser = {
      ...rest,
      ...(data.login !== user.data?.login && { login: data.login }),
      ...(data.email !== user.data?.email && { email: data.email }),
    }

    dispatch(updateProfile(updatedData))
    handleEditProfile()
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(event.target.files?.[0])
  }

  const handleAvatarUpload = async () => {
    if (!avatar) return
    dispatch(editAvatar(avatar))
    setAvatar(undefined)
  }

  const inputNames = Object.keys(INPUTS_DATA).filter(
    item => !item.toLowerCase().includes('password')
  )

  return (
    <div className="page-container">
      <div className="profile-header">
        <h1 className="text-align-center">МОЙ ПРОФИЛЬ</h1>
        <div className="avatar">
          <img
            className="avatar__profile mb-1"
            src={
              user.data?.avatar
                ? `${BASE_URI}/resources${user.data.avatar}`
                : DefaultAvatar
            }
            alt="User Avatar"
          />
          <input
            id="file"
            type="file"
            name="file"
            hidden
            onChange={handleAvatarChange}
          />
          <label className="custom-file-input" htmlFor="file" />
          {avatar && (
            <>
              <button
                type="submit"
                className="avatar__submit-button mb-0"
                onClick={handleAvatarUpload}>
                Сохранить
              </button>
              <div className="avatar__file-name text-align-center mb-2">
                <span className="ellipsis-content">
                  <b>Файл: </b>
                  {avatar?.name}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <Form
        inputTypes={INPUTS_DATA}
        data={user.data}
        onSubmit={handleFormOnSubmit}
        inputNames={inputNames}
        type="edit_profile"
        disabled={editProfile}
      />
      <div className="button-group">
        {editProfile && (
          <>
            <button
              className="button-group__edit-button"
              onClick={handleEditProfile}>
              Редактировать
            </button>
            <Link className="custom-link" to="/change-password">
              Сменить пароль
            </Link>
          </>
        )}
      </div>
      {editProfile ? (
        <Link to="../">Назад</Link>
      ) : (
        <button className="link-button mb-0" onClick={handleEditProfile}>
          Отменить
        </button>
      )}
    </div>
  )
}

export default Profile
