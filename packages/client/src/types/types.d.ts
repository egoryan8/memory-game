interface IUser {
  id?: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password?: string
  phone: string
  avatar?: string
}

interface ILogin {
  login: string
  password: string
}

interface IPassword {
  oldPassword: string
  newPassword: string
}
