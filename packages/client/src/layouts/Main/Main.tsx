import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import s from './styles.module.scss'

export const Main = () => {
  return (
    <div className={s.main}>
      <Header />
      <Outlet />
    </div>
  )
}
