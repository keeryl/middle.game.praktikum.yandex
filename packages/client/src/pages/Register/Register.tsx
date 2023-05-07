import { useEffect, useState } from 'react'
import AuthApi from '../../api/AuthApi'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, message } from 'antd'
import { SignupData } from '../../api/AuthApi'
import styles from './register.module.css'
import { apiErrorsHandler } from '../../utils/apiErrorsHandler'
import {
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
  NICKNAME_REGEXP,
  FIRST_LETTER_CAPITAL,
  NO_DOBBLE_DASHES_AND_UNDERLINES,
  ONLY_LETTERS,
  ONLY_DIGITS,
} from '../../utils/validationRegExps'

const Register = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (data: SignupData) => {
    setIsLoading(true)
    AuthApi.signup(data)
      .then(() => {
        message.success('Регистрация прошла успешно', 3)
        setTimeout(() => {
          AuthApi.fetchUser()
          navigate('/game')
        }, 1000)
      })
      .catch(apiErrorsHandler)
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <main className={styles.main}>
      <Form
        form={form}
        name="register"
        size="large"
        className={styles.form}
        onFinish={() => {
          handleSubmit(form.getFieldsValue())
        }}>
        <Typography.Title level={2} className={styles.title}>
          Регистрация
        </Typography.Title>

        <Form.Item
          name="email"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите адрес почты',
            },
            {
              type: 'email',
              message: 'Непрвильный формат почты',
            },
          ]}
          hasFeedback>
          <Input placeholder="Почта" />
        </Form.Item>

        <Form.Item
          name="login"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите логин',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 3,
              message: 'Введите минимум 3 символа',
            },
            {
              max: 16,
              message: 'Введите не более 16 символов',
            },
            {
              pattern: LOGIN_REGEXP,
              message: 'Непрвильный формат логина',
            },
          ]}
          hasFeedback>
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item
          name="display_name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите никнейм',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 2,
              message: 'Введите минимум 2 символа',
            },
            {
              max: 16,
              message: 'Введите не более 16 символов',
            },
            {
              pattern: NICKNAME_REGEXP,
              message: 'Непрвильный формат никнейма',
            },
          ]}
          hasFeedback>
          <Input placeholder="Никнейм" />
        </Form.Item>

        <Form.Item
          name="first_name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите имя',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 3,
              message: 'Введите минимум 3 символа',
            },
            {
              max: 16,
              message: 'Введите не более 16 символов',
            },
            {
              pattern: FIRST_LETTER_CAPITAL,
              message: 'Имя должно начинаться с заглавной',
            },
            {
              pattern: NO_DOBBLE_DASHES_AND_UNDERLINES,
              message: 'Неправильный формат',
            },
            {
              pattern: ONLY_LETTERS,
              message: 'Введите буквы',
            },
          ]}
          hasFeedback>
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item
          name="second_name"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите фамилию',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 3,
              message: 'Введите минимум 3 символа',
            },
            {
              max: 16,
              message: 'Введите не более 16 символов',
            },
            {
              pattern: FIRST_LETTER_CAPITAL,
              message: 'Фамилия должна начинаться с заглавной',
            },
            {
              pattern: NO_DOBBLE_DASHES_AND_UNDERLINES,
              message: 'Неправильный формат',
            },
            {
              pattern: ONLY_LETTERS,
              message: 'Введите буквы',
            },
          ]}
          hasFeedback>
          <Input placeholder="Фамилия" />
        </Form.Item>

        <Form.Item
          name="phone"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите номер телефона',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 10,
              message: 'Введите минимум 10 символов',
            },
            {
              max: 15,
              message: 'Введите не более 15 символов',
            },
            {
              pattern: ONLY_DIGITS,
              message: 'Введите цифры',
            },
          ]}
          hasFeedback>
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item
          name="password"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
            {
              whitespace: true,
              message: 'Поле не может быть пустым',
            },
            {
              min: 8,
              message: 'Введите минимум 8 символов',
            },
            {
              max: 40,
              message: 'Введите не более 40 символов',
            },
            {
              pattern: PASSWORD_REGEXP,
              message: 'Введите одну заглавную и одну цифру',
            },
          ]}
          hasFeedback>
          <Input.Password type="password" placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="passwordCheck"
          validateFirst={true}
          rules={[
            {
              required: true,
              message: 'Введите пароль ещё раз',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject('Пароли не совпадают')
              },
            }),
          ]}
          hasFeedback>
          <Input.Password type="password" placeholder="Пароль ещё раз" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <>
              <Button
                className={styles.button}
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }>
                Создать аккаунт
              </Button>
              <Link className={styles.link} to="/login">
                Войти
              </Link>
            </>
          )}
        </Form.Item>
      </Form>
    </main>
  )
}

export { Register }
