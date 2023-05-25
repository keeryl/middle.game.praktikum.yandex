import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectIsLoggedIn } from '../../store/userSelectors'

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />
}
