import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'

export const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
