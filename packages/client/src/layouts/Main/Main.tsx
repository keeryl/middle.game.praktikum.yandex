import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import s from './styles.module.scss'
import { useAppDispatch } from '../../store/hooks'
import { fetchUser } from '../../store/userSlice'
import { useEffect } from 'react'
import { oauthController } from '../../controllers/OAuthController/OAuthController'

export const Main = () => {
  const dispatch = useAppDispatch()
  const urlParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    console.log(urlParams.get('code'))
    if (urlParams.get('code')) {
      oauthController
        .signinOAuth({
          code: urlParams.get('code') || '',
          redirect_uri: 'http://localhost:3000',
        })
        .then(() => {
          dispatch(fetchUser())
        })
    } else {
      dispatch(fetchUser())
    }
  }, [dispatch])

  return (
    <div className={s.main}>
      <Header />
      <Outlet />
    </div>
  )
}
