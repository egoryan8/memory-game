import React, { useEffect } from 'react'
import FormContainer from '@/components/FormContainer/FormContainer'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import login from '@/store/asyncActions/auth/login'
import Button from '@/components/Button/Button'
import { BASE_URI } from '@/utils/HTTPClient'
import YandexIcon from '@/assets/images/other/ya.svg'
import style from './Login.module.scss'
import { AppPath } from '@/types/AppPath'

export const authCode = new URLSearchParams(location.search).get('code')

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputNames = ['login', 'password']
  const navigateTo = (path: string) => (window.location.href = path)
  const isClient = typeof window !== 'undefined'
  const redirectUri = isClient
    ? window.location.origin
    : 'https://наш-будущий-домен'

  const onSubmit: SubmitHandler<ILogin> = data => dispatch(login(data))

  const sendAuthCode = async (code: string, redirectUri: string) => {
    try {
      await fetch(`${BASE_URI}/oauth/yandex`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: redirectUri,
        }),
      })
    } catch (error) {
      console.error('Ошибка при отправке кода авторизации:', error)
    }
  }

  const fetchServiceId = async () => {
    try {
      const response = await fetch(
        `${BASE_URI}/oauth/yandex/service-id?redirect_uri=${redirectUri}`
      )
      const data = await response.json()
      return data.service_id
    } catch (error) {
      console.error('Ошибка при получении service_id:', error)
    }
  }

  const handleYandexLogin = async () => {
    const serviceId = await fetchServiceId()
    const yandexUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`
    return navigateTo(yandexUrl)
  }

  useEffect(() => {
    if (!authCode) return
    sendAuthCode(authCode, redirectUri).then(() => navigateTo(AppPath.MAIN))
  }, [authCode])

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
