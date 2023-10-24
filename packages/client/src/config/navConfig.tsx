import { AppPath } from '@/types/AppPath'
import Avatar from '@/components/Avatar/Avatar'
import React from 'react'

export const navConfig = [
  {
    text: 'Играть',
    path: AppPath.MAIN,
    logo: null,
  },
  {
    text: 'Форум',
    path: AppPath.FORUM,
    logo: null,
  },
  {
    text: 'Рейтинг',
    path: AppPath.LEADERBOARD,
    logo: null,
  },
  {
    text: 'Профиль',
    path: AppPath.PROFILE,
    logo: <Avatar isEdit={false} />,
  },
]
