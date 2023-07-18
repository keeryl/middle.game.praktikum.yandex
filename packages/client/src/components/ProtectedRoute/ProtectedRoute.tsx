import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import {
  selectIsLoggedIn,
  selectUserisLoading,
} from '../../store/userSelectors'

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = useAppSelector(selectUserisLoading)

  return isLoading ? (
    <></>
  ) : isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  )
}
