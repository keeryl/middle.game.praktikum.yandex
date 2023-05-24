import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import s from './styles.module.scss'
import { useAppDispatch } from '../../store/hooks'
import { fetchUser, logOut } from '../../store/userSlice'
import { useEffect } from 'react'

export const Main = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    //dispatch(logOut())
  }, [])
  return (
    <div className={s.main}>
      <Header />
      <Outlet />
    </div>
  )
}
