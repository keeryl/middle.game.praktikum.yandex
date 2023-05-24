import { Navigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectIsLoggedIn } from '../../store/userSelectors';
import { fetchUser } from '../../store/userSlice';

interface ProtectedRouteProps {
  component: FC
}

function ProtectedRoute ({ component: Component }: ProtectedRouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    console.log('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

    return isLoggedIn ? <Component/> : <Navigate to={"/login"} replace={true}/>

}

export { ProtectedRoute };