import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import cn from '@/utils/classNames'
import s from './Button.module.scss'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: 'orange'
  className?: string
  children: ReactNode
}

const Button = ({
  theme = undefined,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(s.btn, { [s.btnOrange]: theme === 'orange' }, [className])}
      {...props}>
      {children}
    </button>
  )
}

export default Button
