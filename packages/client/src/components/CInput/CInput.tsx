import React, { ChangeEvent, useState } from 'react'
import CInputProps from './types'

const CInput: React.FC<CInputProps> = ({
  id,
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
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default CInput
