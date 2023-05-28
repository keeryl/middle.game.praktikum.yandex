import { Routes, Route } from 'react-router-dom'
import { Main } from '../../layouts/Main'
import { Landing } from '../../pages/Landing'
import { Forum } from '../../pages/Forum'
import { Leaderboard } from '../../pages/Leaderboard'
import { Game } from '../../pages/Game'
import { NotFound } from '../../pages/NotFound'
import { ServerError } from '../../pages/ServerError'
import { Login } from '../../pages/Login'
import { Register } from '../../pages/Register'
import { Profile } from '../../pages/Profile'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route index path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/forum" element={<Forum />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />
      </Routes>
    </>
  )
}
