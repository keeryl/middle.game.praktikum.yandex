import { Dropdown, Layout, Menu, MenuProps, Button, Space, Switch } from 'antd'
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
import { useCallback, useEffect, useState } from 'react'
import light from "../../../public/img/light.png"
import dark from "../../../public/img/dark.png"
import { themeController } from '../../controllers/ThemeController'

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

  const [lightTheme, setLightTheme] = useState<boolean>(true);

  const changeTheme = useCallback(async () => {
    const root = document.querySelector(":root");

    if (lightTheme) {
      await themeController.updateUserTheme({ id: user.id, theme: 'dark'});

      root?.classList.add('darkTheme');
    } else {
      await themeController.updateUserTheme({ id: user.id, theme: 'light'});

      root?.classList.remove('darkTheme');
    }

    setLightTheme(!lightTheme);
    
  }, [lightTheme, user]);

  const loadData = useCallback(async () => {
    if (user?.id) {
      const theme = await themeController.getUserTheme({ id: user.id });
      if (theme === 'dark') {
            setLightTheme(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!lightTheme) {
      const root = document.querySelector(":root");
      root?.classList.add('darkTheme');
    }

    loadData();
  }, [user, lightTheme]);

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

      <div className={s.togle}>
        <Space direction="vertical" onClick={changeTheme}>
          <Switch
            checkedChildren={<img className={s.togle__lightTheme} src={light} />}
            unCheckedChildren={<img className={s.togle__darkTheme} src={dark} />}
            checked={lightTheme}
          />
        </Space>
      </div>

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
