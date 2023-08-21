import * as React from 'react'

interface IError {
  name: string
  text: string
}

const Error = (error: IError) => {
  return (
    <div>
      <div>Error</div>
      <div>{error.name}</div>
      <div>{error.text}</div>
    </div>
  )
}

export default Error
