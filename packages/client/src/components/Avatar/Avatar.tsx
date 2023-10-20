import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { userSelector } from '@/store/slices/userSlice'
import { BASE_URI } from '@/utils/HTTPClient'
import DefaultAvatar from '@/assets/images/other/default-avatar-icon.svg'
import React from 'react'
import s from './Avatar.module.scss'
import { updateAvatar } from '@/store/asyncThunks/user/updateAvatar'

const Avatar = ({ isEdit = true }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSelector)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return
    dispatch(updateAvatar(file))
  }

  return (
    <div className={isEdit ? s.avatar : s.avatarAutoSize}>
      <img
        className={s.img}
        src={
          user.data?.avatar
            ? `${BASE_URI}/resources${user.data.avatar}`
            : DefaultAvatar
        }
        alt="User Avatar"
      />
      {isEdit && (
        <>
          <input
            id="file"
            type="file"
            name="file"
            hidden
            onChange={handleAvatarChange}
          />
          <label className={s.customFileInput} htmlFor="file" />
        </>
      )}
    </div>
  )
}

export default Avatar
