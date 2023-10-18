import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import { AppPath } from '@/types/AppPath'

interface IError {
  name: string
  text: string
  linkText?: string
  linkPath?: string
}

const Error = (error: IError) => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.errorName}>
        {error.name}
        <span className={styles.errorText}>{error.text}</span>
      </h1>
      <Link to={error.linkPath || AppPath.MAIN}>
        {error.linkText || 'Вернуться на главную страницу'}
      </Link>
    </div>
  )
}

export default Error
