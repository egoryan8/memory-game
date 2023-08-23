import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import cn from 'classnames'
import s from './button.module.scss'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: 'blue'
  className?: string
  children: ReactNode
}

const Button = ({ theme, className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(s.button, className, { [s.blue]: theme === 'blue' })}
      {...props}>
      {children}
    </button>
  )
}

export default Button
