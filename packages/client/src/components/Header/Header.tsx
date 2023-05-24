import React from 'react'
import { Dropdown, Layout, Menu, MenuProps, Button } from 'antd'
import s from './styles.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectUserData } from '../../store/userSelectors'
import { logOut } from '../../store/userSlice'

const navConfig: { label: string; path: string }[] = [
  { label: 'Главная', path: '/' },
  { label: 'Форум', path: '/forum' },
  { label: 'Лидерборд', path: '/leaderboard' },
  { label: 'Играть', path: '/game' },
]

const navItems: MenuProps['items'] = navConfig.map(item => ({
  key: item.label,
  label: (
    <Link className={s.navLink} to={item.path}>
      {item.label}
    </Link>
  ),
}))

export const Header = () => {
  const user = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [currentPath, setCurrentPath] = useState<string>(
    navConfig.find(item => item.path === pathname)?.label as string
  )

  const dropDownItems: MenuProps['items'] = [
    {
      label: (
        <Link className={s.navLink} to={'/profile'}>
          Профиль
        </Link>
      ),
      key: 0,
    },
    {
      label: (
        <Link className={s.navLink} to='/login' onClick={() => dispatch(logOut())}>
          Выход
        </Link>
      ),
      key: 1,
    },
  ]

  const onNavItemClick: MenuProps['onClick'] = e => {
    if (e.key === '0') {
      setCurrentPath(e.key)
    }
  }

  return (
    <Layout.Header className={s.header}>
      <div>LOGO</div>
      <Menu
        mode={'horizontal'}
        selectedKeys={[currentPath]}
        onClick={onNavItemClick}
        items={navItems}
        className={s.nav}
      />
      {!!user && (
        <Dropdown menu={{ items: dropDownItems }}>
          <div>{user.login}</div>
        </Dropdown>
      )}
    </Layout.Header>
  )
}
