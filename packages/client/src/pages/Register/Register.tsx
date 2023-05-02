import React, { useEffect, useState } from 'react';
import AuthApi from '../../api/AuthApi';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { SignupData } from '../../api/AuthApi';
import styles from './register.module.css';



const Register = () => {
    const navigate = useNavigate();
    const [ form ] = Form.useForm();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            console.log('component will unmount')
        }
    }, []);

    const handleSubmit = (data: SignupData) => {
        setIsLoading(true);
        AuthApi.signup(data)
            .then(() => {
                message.success('Регистрация прошла успешно', 3);
                setTimeout(() => {
                    AuthApi.fetchUser();
                    navigate('/game');
                  }, 1000);
            })
            .catch((e) => {
                if (e === 400) {
                    message.error('Неверный запрос', 3);
                } else if (e === 401) {
                    message.error('Нет прав', 3);
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
                    name='register'
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
                        Регистрация
                    </Typography.Title>

                    <Form.Item
                        name="email"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите адрес почты' 
                            },
                            { 
                                type: 'email',
                                message: 'Непрвильный формат почты'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Почта"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

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
                                    Promise.reject('Непрвильный формат логина');
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
                        name="display_name"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите никнейм' 
                            },
                            { 
                                whitespace: true,
                                message: 'Поле не может быть пустым'
                            },
                            { 
                                min: 2,
                                message: 'Введите минимум 2 символа'
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
                                    Promise.reject('Неправильный формат никнейма');
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Никнейм"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите имя' 
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
                                    if (!/^[A-ZА-ЯЁ]{1}.*$/gm.test(value)) {
                                        return Promise.reject('Имя должно начинаться с заглавной');
                                    } else if (!/^(?!.*--)(?!.*-_)(?!.*_-)(?!.*_).*\w$/gm.test(value)) {
                                        return Promise.reject('Неправильный формат');
                                    } else if (!/^.*[A-Za-zА-ЯЁа-яё-]$/gm.test(value)) {
                                        return Promise.reject('Введите буквы');
                                    } else {
                                        return Promise.resolve()
                                    }
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Имя"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="second_name"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите фамилию' 
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
                                    if (!/^[A-ZА-ЯЁ]{1}.*$/gm.test(value)) {
                                        return Promise.reject('Фамилия должна начинаться с заглавной');
                                    } else if (!/^(?!.*--)(?!.*-_)(?!.*_-)(?!.*_).*\w$/gm.test(value)) {
                                        return Promise.reject('Неправильный формат');
                                    } else if (!/^.*[A-Za-zА-ЯЁа-яё-]$/gm.test(value)) {
                                        return Promise.reject('Введите буквы');
                                    } else {
                                        return Promise.resolve()
                                    }
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Фамилия"
                            style={{fontSize: '16px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        validateFirst={true}
                        rules={[
                            { 
                                required: true, 
                                message: 'Введите номер телефона' 
                            },
                            { 
                                whitespace: true,
                                message: 'Поле не может быть пустым'
                            },
                            { 
                                min: 10,
                                message: 'Введите минимум 10 символов'
                            },
                            { 
                                max: 15,
                                message: 'Введите не более 15 символов'
                            },
                            () => ({
                                validator(_, value) {
                                   return /\+?[\d]{10,15}$/.test(value) ? 
                                    Promise.resolve()
                                    : 
                                    Promise.reject('Введите цифры')
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input 
                            placeholder="Телефон"
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
                        name="passwordCheck"
                        style={{fontSize: '10px'}}
                        validateFirst={true}
                        rules={[
                            {
                                required: true, 
                                message: 'Введите пароль ещё раз'
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                   return getFieldValue('password') === value ? 
                                    Promise.resolve()
                                    : 
                                    Promise.reject('Пароли не совпадают')
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            type="password"
                            placeholder="Пароль ещё раз"
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
                                Создать аккаунт
                            </Button>
                            <Link className={styles.link} to='/login'>Войти</Link>
                            </>
                        )}
                    </Form.Item>
                </Form>
            </main>

    );
}

export { Register };
