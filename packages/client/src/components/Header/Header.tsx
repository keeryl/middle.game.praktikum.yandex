import React from 'react'
import { Dropdown, Layout, Menu, MenuProps } from 'antd'
import s from './styles.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

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
      <Link className={s.navLink} to={'/register'}>
        Выход
      </Link>
    ),
    key: 1,
  },
]

export const Header = () => {
  const { pathname } = useLocation()
  const [currentPath, setCurrentPath] = useState<string>(
    navConfig.find(item => item.path === pathname)?.label as string
  )

  const onNavItemClick: MenuProps['onClick'] = e => {
    setCurrentPath(e.key)
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
      <Dropdown menu={{ items: dropDownItems }}>
        <div>nagibator322</div>
      </Dropdown>
    </Layout.Header>
  )
}
