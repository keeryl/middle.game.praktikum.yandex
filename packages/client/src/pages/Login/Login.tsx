import React, { useEffect, useState } from 'react';
import AuthApi from '../../api/AuthApi';
import { Link, redirect } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import styles from './login.module.css';



const Login = () => {
    const [ form ] = Form.useForm();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            console.log('component will unmount')
        }
    }, []);

    const handleSubmit = (data: { login: string, password: string }) => {
        setIsLoading(true);
        AuthApi.signin(data)
            .then(() => {
                message.success('Авторизация прошла успешно', 3);
                setTimeout(() => {
                    AuthApi.fetchUser();
                    redirect('/game');
                  }, 1000);
            })
            .catch((e) => {
                if (e === 400) {
                    message.error('Неверный запрос', 3);
                } else if (e === 401) {
                    message.error('Неверный логин или пароль', 3);
                } else if (e === 500) {
                    message.error('Произошла ошибка на сервере', 3);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
            <main className={styles.main}>
                <Form
                    form={form}
                    name='login'
                    size='large'
                    className={styles.form}
                    onFinish={
                        () => {
                            handleSubmit(form.getFieldsValue())
                        }
                    }
                >
                    <Typography.Title
                        level={1}
                        style={{
                            fontSize: '32px',
                            fontWeight: '500'
                        }}
                        className={styles.title}
                    >
                        Вход
                    </Typography.Title>

                    <Form.Item
                        name="login"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите логин' 
                            },
                            { 
                                whitespace: true,
                                message: 'Поле не может быть пустым'
                            },
                            { 
                                min: 3,
                                message: 'Введите минимум 3 символа'
                            },
                            { 
                                max: 16,
                                message: 'Введите не более 16 символов'
                            },
                            () => ({
                                validator(_, value) {
                                   return /^(?![\W_|-]{1})(?!.*_-)(?!.*-_)(?!.*--)(?!.*__).[\w-]*(?<!.-|_)$/gi.test(value) ? 
                                    Promise.resolve()
                                    : 
                                    Promise.reject('Непрвильный формат логина')
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Логин"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        style={{fontSize: '10px'}}
                        validateFirst={true}
                        rules={[
                            {
                                required: true, 
                                message: 'Введите пароль'
                            },
                            { 
                                whitespace: true,
                                message: 'Поле не может быть пустым'
                            },
                            { 
                                min: 8,
                                message: 'Введите минимум 8 символов'
                            },
                            { 
                                max: 40,
                                message: 'Введите не более 40 символов'
                            },
                            () => ({
                                validator(_, value) {
                                   return /^(?=.*?[0-9])(?=.*?[A-Z]).*$/.test(value) ? 
                                    Promise.resolve()
                                    : 
                                    Promise.reject('Непрвильный формат пароля')
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            type="password"
                            placeholder="Пароль"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        shouldUpdate
                    >
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
                                }
                            >
                                Войти
                            </Button>
                            <Link className={styles.link} to='/register'>Еще не зарегистрированы?</Link>
                            </>
                        )}
                    </Form.Item>
                </Form>
            </main>

    );
}

export { Login };
