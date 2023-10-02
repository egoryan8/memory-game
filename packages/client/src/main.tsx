import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/index.scss'
import store from '@/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root') as HTMLElement
const renderFunction =
  root && root.hasChildNodes() ? ReactDOM.hydrateRoot : ReactDOM.createRoot

renderFunction(
  root,
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
