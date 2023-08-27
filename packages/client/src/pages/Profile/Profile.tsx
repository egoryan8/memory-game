import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import DefaultAvatar from '@/assets/images/default-avatar-icon.svg'

interface IProfile {
  first_name: string
  last_name: string
  login: string
  email: string
  phone: string
}

const _fakeData = {
  first_name: 'Igor',
  last_name: 'Volkov',
  login: 'theVolkov',
  email: 'info@thevolkov.ru',
  phone: '+79995556677',
}

const Profile: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [editProfile, setEditProfile] = useState<boolean>(true)

  const onSubmit: SubmitHandler<IProfile> = data => {
    console.log('PROFILE', data)
  }

  const editProfileHandler = () => setEditProfile(!editProfile)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const inputNames = Object.keys(INPUTS_DATA).filter(
    item => item !== 'password'
  )

  return (
    <div className="page-container">
      <h1 className="text-align-center">МОЙ ПРОФИЛЬ</h1>
      <div className="avatar">
        <div
          className="avatar__profile mb-1"
          style={{ backgroundImage: `url(${avatarPreview || DefaultAvatar})` }}
        />
        <input
          type="file"
          id="upload"
          hidden
          accept="image/jpeg, image/png"
          onChange={handleAvatarChange}
        />
        <label className="custom-file-input" htmlFor="upload" />
      </div>
      <Form
        inputTypes={INPUTS_DATA}
        onSubmit={onSubmit}
        inputNames={inputNames}
        type="edit_profile"
      />
      {!editProfile && (
        <button onClick={editProfileHandler}>Редактировать</button>
      )}
      <Link to="../">Назад</Link>
    </div>
  )
}

export default Profile
