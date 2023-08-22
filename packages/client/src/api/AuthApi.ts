import HTTPClient from '../utils/HTTPClient'

function AuthApi() {
  const client = HTTPClient('/auth')

  const login = async (data: ILoginData) =>
    await client.post('/signin', { body: data as never })

  const logout = async () => await client.post('/logout')

  const registration = async (data: IUserData) =>
    await client.post('/signup', { body: data as never })

  const getUser = async () => await client.get('/user')

  return Object.freeze({
    login,
    logout,
    registration,
    getUser,
  })
}

export default AuthApi()
