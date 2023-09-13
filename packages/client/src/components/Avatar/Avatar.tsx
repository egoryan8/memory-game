import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import editAvatar from '@/store/asyncActions/users/editAvatar'
import { userSelector } from '@/store/features/userSlice'
import { BASE_URI } from '@/utils/HTTPClient'
import DefaultAvatar from '@/assets/images/default-avatar-icon.svg'
import React from 'react'
import s from './Avatar.module.scss'

const Avatar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return
    dispatch(editAvatar(file))
  }

  return (
    <div className={s.avatar}>
      <img
        className={s.img}
        src={`${BASE_URI}/resources${
          user.data?.avatar ? user.data.avatar : DefaultAvatar
        }`}
        alt="User Avatar"
      />
      <input
        id="file"
        type="file"
        name="file"
        hidden
        onChange={handleAvatarChange}
      />
      <label className={s.customFileInput} htmlFor="file" />
    </div>
  )
}

export default Avatar
