import * as yup from 'yup'

const required = 'Поле обязательное для заполнения'
const nameRegExp = /^[A-ZА-Я][A-Za-zА-Яа-я-]*$/
const passwordRegExp = /(?=.*\d)(?=.*[A-Z])/

export const validationRules = {
  first_name: {
    required: required,
    pattern: {
      value: nameRegExp,
      message:
        'Некорректное имя. Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
    },
  },
  second_name: {
    required: required,
    pattern: {
      value: nameRegExp,
      message:
        'Некорректная фамилия. Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
    },
  },
  login: {
    required: required,
    minLength: {
      value: 3,
      message: 'Логин должен содержать минимум 3 символа',
    },
    maxLength: {
      value: 20,
      message: 'Логин должен содержать максимум 20 символов',
    },
    pattern: {
      value: /^(?!^\d+$)[A-Za-z0-9_-]+$/,
      message:
        'Некорректный логин. От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
    },
  },
  email: {
    required: required,
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message:
        'Некорректный email. Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
    },
  },
  password: {
    required: required,
    minLength: {
      value: 8,
      message: 'Пароль должен содержать минимум 8 символов',
    },
    maxLength: {
      value: 40,
      message: 'Пароль должен содержать максимум 40 символов',
    },
    pattern: {
      value: passwordRegExp,
      message:
        'Пароль должен содержать хотя бы одну цифру и одну заглавную букву',
    },
  },
  oldPassword: {
    required: required,
    pattern: {
      value: passwordRegExp,
      message:
        'Старый пароль должен содержать хотя бы одну цифру и одну заглавную букву',
    },
  },
  newPassword: {
    required: required,
    oneOf: [yup.ref('oldPassword'), null],
    minLength: {
      value: 8,
      message: 'Новый пароль должен содержать минимум 8 символов',
    },
    maxLength: {
      value: 40,
      message: 'Новый пароль должен содержать максимум 40 символов',
    },
    pattern: {
      value: passwordRegExp,
      message:
        'Новый пароль должен содержать хотя бы одну цифру и одну заглавную букву',
    },
  },
  phone: {
    required: required,
    minLength: {
      value: 10,
      message: 'Номер телефона должен содержать минимум 10 символов',
    },
    maxLength: {
      value: 15,
      message: 'Номер телефона должен содержать максимум 15 символов',
    },
    pattern: {
      value: /^\+?\d+$/,
      message:
        'Некорректный номер телефона. От 10 до 15 символов, состоит из цифр, может начинаться с плюса.',
    },
  },
}
