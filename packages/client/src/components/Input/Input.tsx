import React, { ChangeEvent, useState } from 'react'

interface InputProps {
  id: string
  name: string
  label: string
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
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
