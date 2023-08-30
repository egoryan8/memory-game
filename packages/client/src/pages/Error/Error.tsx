import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'
import { AppPath } from '@/types/AppPath'

interface IError {
  name: string
  text: string
}

const Error = (error: IError) => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.errorName}>
        {error.name}
        <span className={styles.errorText}>{error.text}</span>
      </h1>
      <Link to={AppPath.MAIN}>Вернуться на главную</Link>
    </div>
  )
}

export default Error
