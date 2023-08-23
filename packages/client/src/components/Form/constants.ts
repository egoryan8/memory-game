export const INPUTS_DATA = {
  first_name: {
    id: 'first_name',
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    required: true,
  },
  last_name: {
    id: 'last_name',
    name: 'last_name',
    label: 'Фамилия',
    type: 'text',
    required: true,
  },
  login: {
    id: 'login',
    name: 'login',
    label: 'Имя пользователя',
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
}

export const FORM_TYPE = {
  LOGIN: 'Войти',
  REGISTER: 'Зарегистрироваться',
}
