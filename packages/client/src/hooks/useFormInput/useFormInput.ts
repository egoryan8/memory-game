import { ChangeEvent, useState } from 'react'

export const useFormInput = <T>(initialState: T) => {
  const [inputValue, setInputValue] = useState<T>(initialState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValue(prevInputValue => ({
      ...prevInputValue,
      [name]: value,
    }))
  }

  return {
    inputValue,
    handleInputChange,
  }
}
