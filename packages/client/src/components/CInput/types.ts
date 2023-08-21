import { ChangeEvent } from 'react'

export default interface CInputProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface InputValue {
  login: string
  password: string
}
