import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react'
import s from './Input.module.scss'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string
  name: string
  label?: string
  type: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: any
  required?: boolean
  value?: string
}

const Input = ({
  id,
  name,
  label,
  type,
  onChange,
  onBlur,
  error,
  required,
  value,
  ...props
}: InputProps) => {
  return (
    <div className={label && s.wrapper}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`${s.inputShell} ${error && s.inputError}`}>
        <input
          className={s.input}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          value={value || ''}
          onBlur={onBlur}
          {...props}
        />
        <div className={s.hint}>
          {error && (
            <span className={s.errorMessage} data-clue={error}>
              i
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Input
