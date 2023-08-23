import React, { ChangeEvent } from 'react'

interface InputProps {
  id: string
  name: string
  label: string
  type: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: any
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type,
  onChange,
  onBlur,
  error,
  required,
}) => {
  return (
    <div className={`form-group ${error && 'validation-error'}`}>
      <label htmlFor={id}>
        {label}
        {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default Input
