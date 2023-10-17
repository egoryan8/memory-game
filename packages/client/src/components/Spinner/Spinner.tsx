import React from 'react'

const spinnerStyles = {
  fontSize: '4rem',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const Spinner = () => {
  return <div style={spinnerStyles}>⏳</div>
}
