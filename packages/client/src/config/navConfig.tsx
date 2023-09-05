import { AppPath } from '@/types/AppPath'
import { ReactComponent as GameIco } from '@/components/Navigation/icons/dice.svg'
import { ReactComponent as ForumIco } from '@/components/Navigation/icons/forum.svg'
import { ReactComponent as RatingIco } from '@/components/Navigation/icons/medal.svg'
import { ReactComponent as ProfileIco } from '@/components/Navigation/icons/profile.svg'

export const navConfig = [
  {
    text: 'Играть',
    path: AppPath.MAIN,
    logo: <GameIco />,
  },
  {
    text: 'Форум',
    path: AppPath.FORUM,
    logo: <ForumIco />,
  },
  {
    text: 'Рейтинг',
    path: AppPath.LEADERBOARD,
    logo: <RatingIco />,
  },
  {
    text: 'Профиль',
    path: AppPath.PROFILE,
    logo: <ProfileIco />,
  },
]
