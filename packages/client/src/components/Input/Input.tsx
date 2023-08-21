import React, { ChangeEvent, useState } from 'react'
import CInputProps from './types'

const Input: React.FC<CInputProps> = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    onChange(event)
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Input
