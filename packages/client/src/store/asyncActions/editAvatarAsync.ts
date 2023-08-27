import UserApi from '@/api/UserApi'

const editAvatarAsync = () => ({
  editAvatarAsync: (data: File) => {
    ;(async () => {
      UserApi.editAvatar(data)
        .then(async response => {
          return {
            status: response.status,
            text: await response.text(),
          }
        })
        .then(response => {
          switch (response.status) {
            case 200:
              return true
            default: {
              console.log('EDIT_AVATAR_FAILED', response)
              return false
            }
          }
        })
    })()
  },
})

export default editAvatarAsync
