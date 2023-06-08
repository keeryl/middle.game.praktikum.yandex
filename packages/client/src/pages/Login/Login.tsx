import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, message } from 'antd'
import styles from './login.module.css'
import { apiErrorsHandler } from '../../utils/apiErrorsHandler'
import { LOGIN_REGEXP, PASSWORD_REGEXP } from '../../utils/validationRegExps'
import { authController } from '../../controllers/AuthController'
import { oauthController } from '../../controllers/OAuthController/OAuthController'

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (data: { login: string; password: string }) => {
    setIsLoading(true)
    authController
      .signin(data)
      .then(() => {
        message.success('Авторизация прошла успешно', 3)
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
      .catch(apiErrorsHandler)
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleOAuth = () => {
    oauthController
      .getServiceId()
      .then(res => {
        if (res) {
          console.log('res', res)
          window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${
            res.service_id
          }&redirect_uri=${encodeURIComponent('http://localhost:3000')}`
        }
      })
      .catch(apiErrorsHandler)
  }

  return (
    <main className={styles.main}>
      <Form
        form={form}
        name="login"
        size="large"
        className={styles.form}
        onFinish={() => {
          handleSubmit(form.getFieldsValue())
        }}>
        <Typography.Title level={2} className={styles.title}>
          Вход
        </Typography.Title>

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
              message: 'Непрвильный формат пароля',
            },
          ]}
          hasFeedback>
          <Input.Password type="password" placeholder="Пароль" />
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
                Войти
              </Button>
            </>
          )}
        </Form.Item>
        <button
          className={styles.ya_button}
          type="button"
          onClick={() => handleOAuth()}>
          <div className={styles.ya_logo}></div>
          Войти с Яндекс ID
        </button>
        <Link className={styles.link} to="/register">
          Еще не зарегистрированы?
        </Link>
      </Form>
    </main>
  )
}

export { Login }
