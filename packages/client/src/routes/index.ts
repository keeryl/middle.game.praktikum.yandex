import { Landing } from "../pages/Landing"
import { Main } from "../layouts/Main"
import { Forum } from "../pages/Forum"
import { Login } from "../pages/Login"
import { Leaderboard } from "../pages/Leaderboard"
import { Game } from "../pages/Game"
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register"
import { NotFound } from "../pages/NotFound"
import { ServerError } from "../pages/ServerError"



export const routes = [
  {
    path: '/',
    exact: true,
    component: Main,
  },
  {
    path: '/',
    exact: true,
    component: Landing,
  },
  {
    path: '/forum',
    exact: true,
    component: Forum ,
    
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/leaderboard',
    exact: true,
    component: Leaderboard ,
  },
  {
    path: '/game',
    exact: true,
    component: Game,
  },
  {
    path: '/profile',
    exact: true,
    component: Main,
  },
  {
    path: '/',
    exact: true,
    component: Main,
  },
  {
    path: "/login",
    exact: true,
    component: Login
  },
  {
    path: "/register",
    exact: true,
    component: Register
  },
  {
    path: "*",
    exact: true,
    component: NotFound
  }, 
  {
    path: "/500",
    exact: true,
    component: ServerError
  },
]


 