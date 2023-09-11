import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import cn from '@/utils/classNames'
import s from './Button.module.scss'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: 'blue' | 'dark'
  className?: string
  children: ReactNode
}

const Button = ({
  theme = 'blue',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(s.button, {}, [className, s[theme]])} {...props}>
      {children}
    </button>
  )
}

export default Button
