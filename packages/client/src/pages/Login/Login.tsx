import React from 'react'
import FormContainer from '@/components/FormContainer/FormContainer'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import Button from '@/components/Button/Button'
import YandexIcon from '@/assets/images/other/ya.svg'
import style from './Login.module.scss'
import { login } from '@/store/asyncThunks/auth/login'
import OAuthApi from '@/api/OAuthApi'
import { REDIRECT_URI } from '@/utils/HTTPClient'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputNames = ['login', 'password']
  const navigateTo = (path: string) => (window.location.href = path)
  const onSubmit: SubmitHandler<ILogin> = data => dispatch(login(data))

  const handleYandexLogin = async () => {
    const serviceId = await OAuthApi.fetchServiceId(REDIRECT_URI)
    const yandexUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`
    return navigateTo(yandexUrl)
  }

  return (
    <>
      <FormContainer contentType={'login'}>
        <Form
          inputTypes={INPUTS_DATA}
          onSubmit={onSubmit}
          inputNames={inputNames}
          type="login"
        />
        <Button
          className={style.YandexButton}
          type="button"
          onClick={handleYandexLogin}>
          <img src={YandexIcon} alt="Yandex icon" />
          Яндекс.ID
        </Button>
      </FormContainer>
    </>
  )
}

export default Login
