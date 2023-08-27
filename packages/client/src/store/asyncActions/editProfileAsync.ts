import UserApi from '@/api/UserApi'

const editProfileAsync = () => ({
  editProfileAsync: (data: IUser) => {
    ;(async () => {
      UserApi.editProfile(data)
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
              console.log('EDIT_PROFILE_FAILED', response)
              return false
            }
          }
        })
    })()
  },
})

export default editProfileAsync
