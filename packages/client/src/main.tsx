import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/index.scss'
import createStore from '@/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AuthApi from '@/api/AuthApi'
const initialState = window.initialState

delete window.initialState
const root = document.getElementById('root') as HTMLElement
const renderFunction =
  root && root.hasChildNodes() ? ReactDOM.hydrateRoot : ReactDOM.createRoot

renderFunction(
  root,
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore(AuthApi.getUser, initialState)}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
