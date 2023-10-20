import { AppPath } from '@/types/AppPath'
import GameIco from '@/components/Navigation/icons/dice.svg'
import ForumIco from '@/components/Navigation/icons/forum.svg'
import RatingIco from '@/components/Navigation/icons/medal.svg'
import Avatar from '@/components/Avatar/Avatar'
import React from 'react'

export const navConfig = [
  {
    text: 'Играть',
    path: AppPath.MAIN,
    logo: <img src={GameIco} alt="Game icon" />,
  },
  {
    text: 'Форум',
    path: AppPath.FORUM,
    logo: <img src={ForumIco} alt="Forum icon" />,
  },
  {
    text: 'Рейтинг',
    path: AppPath.LEADERBOARD,
    logo: <img src={RatingIco} alt="Rating icon" />,
  },
  {
    text: 'Профиль',
    path: AppPath.PROFILE,
    logo: <Avatar isEdit={false} />,
  },
]
