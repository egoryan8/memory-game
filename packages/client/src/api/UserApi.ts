import HTTPClient from '@/utils/HTTPClient'

function UserApi() {
  const client = HTTPClient('/user')

  const editProfile = async (data: Partial<IUser>) =>
    await client.put('/profile', data)

  const editAvatar = async (avatar: File) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    return await client.putFile('/profile/avatar', formData)
  }

  const editPassword = async (data: IPassword) =>
    await client.put('/password', data)

  return Object.freeze({
    editAvatar,
    editProfile,
    editPassword,
  })
}

export default UserApi()
