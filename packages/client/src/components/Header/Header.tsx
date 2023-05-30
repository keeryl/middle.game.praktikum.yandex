import { Dropdown, Layout, Menu, MenuProps, Button, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import s from './styles.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  selectUserData,
  selectIsLoggedIn,
  selectUserisLoading,
} from '../../store/userSelectors'
import { logOut } from '../../store/userSlice'

export const Header = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUserData)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectUserisLoading)
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const navItems: MenuProps['items'] = [
    {
      label: (
        <Link className={s.navLink} to="/">
          Главная
        </Link>
      ),
      key: '/',
    },
    {
      label: (
        <Link className={s.navLink} to="/forum">
          Форум
        </Link>
      ),
      key: '/forum',
    },
    {
      label: (
        <Link className={s.navLink} to="/leaderboard">
          Лидерборд
        </Link>
      ),
      key: '/leaderboard',
    },
    {
      label: (
        <Link className={s.navLink} to="/game">
          Игра
        </Link>
      ),
      key: '/game',
    },
  ]

  const dropDownItems: MenuProps['items'] = [
    {
      label: <Link to={'/profile'}>Профиль</Link>,
      key: 'profile',
    },
    {
      label: (
        <Link to="/" onClick={() => dispatch(logOut())}>
          Выход
        </Link>
      ),
      key: 'logout',
      danger: true,
    },
  ]

  return (
    <Layout.Header className={s.header}>
      <div className={s.logo} onClick={() => navigate('/')}>
        GoodGame
      </div>

      {isLoggedIn && (
        <Menu
          mode={'horizontal'}
          selectedKeys={[pathname]}
          items={navItems}
          className={s.nav}
        />
      )}

      {isLoggedIn
        ? !!user && (
            <Dropdown className={s.navLink} menu={{ items: dropDownItems }}>
              <Space>
                {user.login}
                <DownOutlined />
              </Space>
            </Dropdown>
          )
        : !isLoading && (
            <Space>
              <Button type="primary" onClick={() => navigate('/login')}>
                Войти
              </Button>
              <Button onClick={() => navigate('/register')}>
                Зарегистрироваться
              </Button>
            </Space>
          )}
    </Layout.Header>
  )
}
