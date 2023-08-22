import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'

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
      <Link to="/">Вернуться на главную</Link>
    </div>
  )
}

export default Error
