export const INPUTS_DATA = {
  first_name: {
    id: 'first_name',
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    required: true,
  },
  second_name: {
    id: 'second_name',
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    required: true,
  },
  login: {
    id: 'login',
    name: 'login',
    label: 'Логин',
    type: 'text',
    required: true,
  },
  email: {
    id: 'email',
    name: 'email',
    label: 'Почта',
    type: 'email',
    required: true,
  },
  phone: {
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    required: true,
  },
  password: {
    id: 'password',
    name: 'password',
    label: 'Пароль',
    type: 'password',
    required: true,
  },
  oldPassword: {
    id: 'oldPassword',
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    required: true,
  },
  newPassword: {
    id: 'newPassword',
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    required: true,
  },
}

export const FORM_TYPE = {
  LOGIN: 'Войти',
  REGISTER: 'Зарегистрироваться',
  EDIT_PROFILE: 'Сохранить',
}
