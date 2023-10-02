import FormContainer from '@/components/FormContainer/FormContainer'
import React from 'react'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import login from '@/store/asyncActions/auth/login'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ILogin> = data => dispatch(login(data))
  const inputNames = ['login', 'password']

  return (
    <>
      <FormContainer contentType={'login'}>
        <Form
          inputTypes={INPUTS_DATA}
          onSubmit={onSubmit}
          inputNames={inputNames}
          type="login"
        />
      </FormContainer>
    </>
  )
}

export default Login
