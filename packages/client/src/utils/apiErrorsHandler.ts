import { message } from 'antd'

export const apiErrorsHandler = (e: number) => {
  if (e === 400) {
    message.error('Неверный запрос', 3)
  } else if (e === 401) {
    message.error('Произошла ошибка авторизации', 3)
  } else if (e === 500) {
    message.error('Произошла ошибка на сервере', 3)
  }
}
