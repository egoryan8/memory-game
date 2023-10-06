import axios from 'axios'

const BASE_URI = 'https://ya-praktikum.tech/api/v2'

function AuthApi(cookie: string | undefined) {
  const getUser = async () => {
    const { data } = await axios.get(`${BASE_URI}/auth/user`, {
      headers: {
        cookie: cookie,
      },
    })
    return {
      data,
      xss: "</script><script>alert('pwned')</script><!--",
    }
  }

  return Object.freeze({ getUser })
}

export default AuthApi
