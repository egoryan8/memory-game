import HTTPClient from '../utils/HTTPClient'

function AuthApi() {
  const client = HTTPClient('/auth')

  const login = async (data: ILogin) =>
    await client.post('/signin', { body: data as never })

  const logout = async () => await client.post('/logout')

  const register = async (data: IUser) =>
    await client.post('/signup', { body: data as never })

  const getUser = async () => await client.get('/user')

  return Object.freeze({
    login,
    logout,
    register,
    getUser,
  })
}

export default AuthApi()
