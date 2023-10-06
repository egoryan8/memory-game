import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import store from './src/store'
import { Provider } from 'react-redux'

export function render(uri: string) {
  return renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}
