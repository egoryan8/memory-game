import UserApi from '@/api/UserApi'

const editPasswordAsync = () => ({
  editPasswordAsync: (data: IPassword) => {
    ;(async () => {
      UserApi.editPassword(data)
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
              console.log('EDIT_PASSWORD_FAILED', response)
              return false
            }
          }
        })
    })()
  },
})

export default editPasswordAsync
