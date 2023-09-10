import { ReactNode } from 'react'
import cn from '@/utils/classNames'
import s from './Title.module.scss'

interface TitleProps {
  tag: 'h1' | 'h2' | 'h3'
  className?: string
  children: ReactNode
}

const Title = ({ tag, className, children }: TitleProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return <h1 className={cn(s.h1, {}, [className])}>{children}</h1>
    case 'h2':
      return <h2 className={cn(s.h2, {}, [className])}>{children}</h2>
    case 'h3':
      return <h3 className={cn(s.h3, {}, [className])}>{children}</h3>
  }
}

export default Title
