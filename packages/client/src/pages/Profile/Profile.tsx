import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import DefaultAvatar from '@/assets/images/default-avatar-icon.svg'
import useStore from '@/store'
import { BASE_URI } from '@/utils/HTTPClient'

interface IProfile {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
}

const Profile: React.FC = () => {
  const { user } = useStore()
  const [editProfileAsync] = useStore(store => [store.editProfileAsync])
  const [editAvatarAsync] = useStore(store => [store.editAvatarAsync])
  const [editProfile, setEditProfile] = useState<boolean>(true)
  const [avatar, setAvatar] = useState<File | undefined>()

  const handleEditProfile = () => setEditProfile(!editProfile)

  const handleFormOnSubmit: SubmitHandler<IProfile> = data => {
    editProfileAsync(data)
    handleEditProfile()
  }
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(event.target.files?.[0])
  }
  const handleAvatarUpload = async () => {
    if (!avatar) return
    editAvatarAsync(avatar)
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
          <div
            className="avatar__profile mb-1"
            style={{
              backgroundImage: `url(${
                BASE_URI + '/resources' + user.data?.avatar || DefaultAvatar
              })`,
            }}
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
            <button
              type="submit"
              className="avatar__submit-button mb-0"
              onClick={handleAvatarUpload}>
              Сохранить аватар
            </button>
          )}
          {avatar && (
            <div className="text-align-center mb-2">{avatar?.name}</div>
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
          <button onClick={handleEditProfile}>Редактировать</button>
        )}
        {editProfile && (
          <Link className="custom-link" to="/change-password">
            Сменить пароль
          </Link>
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
