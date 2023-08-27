import HTTPClient from '@/utils/HTTPClient'

function UserApi() {
  const client = HTTPClient('/user')

  const editProfile = async (data: IUser) => {
    const { id, password, avatar, ...newData } = data
    return await client.put('/profile', { body: newData as never })
  }

  const editAvatar = async (avatar: File) => {
    const formData = new FormData()
    await formData.append('avatar', avatar)
    return await client.putFile('/profile/avatar', { body: formData as never })
  }

  const editPassword = async (data: IPassword) =>
    await client.put('/password', { body: data as never })

  return Object.freeze({
    editAvatar,
    editProfile,
    editPassword,
  })
}

export default UserApi()
