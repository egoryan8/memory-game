import HTTPClient from '@/utils/HTTPClient'

function UserApi() {
  const client = HTTPClient('/user')

  const editProfile = async (data: IUser) => {
    const { id, password, avatar, ...newData } = data
    const response = await client.put('/profile', { body: newData as never })
    return response
  }

  const editAvatar = async (avatar: File) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    const response = await client.putFile('/profile/avatar', {
      body: formData as never,
    })
    return response
  }

  const editPassword = async (data: IPassword) => {
    const response = await client.put('/password', { body: data as never })
    return response
  }

  return Object.freeze({
    editAvatar,
    editProfile,
    editPassword,
  })
}

export default UserApi()
