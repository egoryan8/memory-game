import Avatar from '@/components/Avatar/Avatar'
import Button from '@/components/Button/Button'
import Navigation from '@/components/Navigation/Navigation'
import React from 'react'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import s from './Profile.module.scss'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/types/AppPath'
import logOut from '@/assets/images/other/logout.svg'
import { userSelector } from '@/store/slices/userSlice'
import { logout } from '@/store/asyncThunks/auth/logout'
import { updateProfile } from '@/store/asyncThunks/user/updateProfile'

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
  const navigate = useNavigate()

  const handleLogout = () => dispatch(logout())
  const handleChangePassword = () => navigate(AppPath.CHANGE_PASS)

  const handleFormOnSubmit: SubmitHandler<IProfile> = data => {
    const { login, email, ...rest } = data

    const updatedData: IUser = {
      ...rest,
      ...(data.login !== user.data?.login && { login: data.login }),
      ...(data.email !== user.data?.email && { email: data.email }),
    }

    dispatch(updateProfile(updatedData))
  }

  const inputNames = Object.keys(INPUTS_DATA).filter(
    item => !item.toLowerCase().includes('password')
  )

  return (
    <div className={s.page}>
      <Navigation />
      <div className={s.profile}>
        <div className={s.avatar}>
          <Avatar />
        </div>
        <Form
          inputTypes={INPUTS_DATA}
          data={user.data}
          onSubmit={handleFormOnSubmit}
          inputNames={inputNames}
          type="edit_profile"
          isLabel={true}
        />
        <div className={s.buttons}>
          <Button type="button" onClick={handleChangePassword}>
            Сменить пароль
          </Button>
          <Button className={s.exitButton} type="button" onClick={handleLogout}>
            <img src={logOut} alt="logout-icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
