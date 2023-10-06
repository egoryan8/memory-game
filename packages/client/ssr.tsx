import App from './src/App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import createStore from './src/store'
import { Provider } from 'react-redux'
import { loadUser } from './src/store/asyncThunks/auth/loadUser'

export interface ILoadUserApi {
  getUser: () => Promise<any | Response>
}
export async function render(uri: string, api: ILoadUserApi) {
  const store = createStore(api.getUser)
  await (async () => await store.dispatch(loadUser()))()
  const initialState = store.getState()
  return [
    initialState,
    renderToString(
      <StaticRouter location={uri}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    ),
  ]
}
