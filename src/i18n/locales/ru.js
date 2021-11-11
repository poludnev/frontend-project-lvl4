export default {
  translation: {
    title: 'Hexlet Chat',
    spinner: 'Загрузка...',
    page404: {
      title: '404',
      text: 'Страница не найдена',
    },
    logOut: 'Выйти',
    logIn: {
      title: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      submitButton: 'Войти',
      signUpTitle: 'Нет аккаунта?',
      signUpLink: 'Регистрация',
      signInFailure: 'Неверные имя пользователя или пароль',
    },
    signUp: {
      title: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      passwordConfirmationLabel: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
    },
    channels: {
      title: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      messagePlaceHolder: 'Введите сообщение...',
      submitButtonLabel: 'Отправить',
    },
    errors: {
      tooShort: 'От 3 до 20 символов',
      tooLong: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      passwordTooShort: 'Не менее 6 символов',
      passwordNotMatch: 'Пароли должны совпадать',
      userExists: 'Такой пользователь уже существует',
      channelExists: 'Должно быть уникальным',
    },
    modals: {
      add: {
        title: 'Добавить канал',
        inputPlaceholder: 'Введите название канала...',
        submitButton: 'Отправить',
        cancelButton: 'Отменить',
      },
      remove: {
        title: 'Удалить канал',
        confirmation: 'Уверены?',
        submitButton: 'Удалить',
        cancelButton: 'Отменить',
      },
      rename: {
        title: 'Переименовать канал',
        inputPlaceholder: 'Введите название канала...',
        submitButton: 'Отправить',
        cancelButton: 'Отменить',
      },
    },
  },
};
