import FormContainer from '@/components/FormContainer/FormContainer'
import React from 'react'
import Form from '@/components/Form/Form'
import { INPUTS_DATA } from '@/components/Form/constants'
import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { register } from '@/store/asyncThunks/auth/register'

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IUser> = data => dispatch(register(data))
  const inputNames = Object.keys(INPUTS_DATA).filter(
    item => item !== 'oldPassword' && item !== 'newPassword'
  )

  return (
    <>
      <FormContainer contentType={'register'}>
        <Form
          inputTypes={INPUTS_DATA}
          onSubmit={onSubmit}
          inputNames={inputNames}
          type="register"
        />
      </FormContainer>
    </>
  )
}

export default Register
