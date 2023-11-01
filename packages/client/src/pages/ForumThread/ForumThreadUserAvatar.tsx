import { BASE_URI } from '@/utils/HTTPClient'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@/assets/images/other/default-avatar-icon.svg'
import s from './ForumThread.module.scss'

// Создаем объект для кэширования аватаров
const avatarCache = new Map<number, string>()

const ForumThreadUserAvatar: React.FC<{ userId?: number; width?: string }> = ({
  userId,
  width = '20',
}) => {
  const [avatar, setAvatar] = useState<string | undefined>('')

  const getUserById = async (id: number) => {
    // Проверяем, есть ли аватар в кэше
    if (avatarCache.has(id)) {
      setAvatar(avatarCache.get(id))
    } else {
      try {
        const responseUser = await fetch(`${BASE_URI}/user/${id}`)
        const userJson = await responseUser.json()
        const newAvatar = userJson.avatar

        // Сохраняем аватар в кэше
        avatarCache.set(id, newAvatar)

        setAvatar(newAvatar)
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
      }
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
