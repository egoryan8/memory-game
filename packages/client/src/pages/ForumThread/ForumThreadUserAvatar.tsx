import { BASE_URI } from '@/utils/HTTPClient'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@/assets/images/other/default-avatar-icon.svg'
import s from './ForumThread.module.scss'

const ForumThreadUserAvatar: React.FC<{ userId?: number; width?: string }> = ({
  userId,
  width = '20',
}) => {
  const [avatar, setAvatar] = useState<string>('')

  const getUserById = async (id: number) => {
    try {
      const responseUser = await fetch(`${BASE_URI}/user/${id}`)
      const userJson = await responseUser.json()
      setAvatar(userJson.avatar)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  useEffect(() => {
    if (!userId) return

    getUserById(userId)
  }, [userId])

  return (
    <img
      style={{ width: width + 'px' }}
      className={s.avatar}
      src={avatar ? `${BASE_URI}/resources${avatar}` : DefaultAvatar}
      alt={avatar}
    />
  )
}

export default ForumThreadUserAvatar
