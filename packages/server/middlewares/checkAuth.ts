import type { NextFunction, Request, Response } from 'express'

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.cookies.uuid && req.cookies.authCookie) {
    next()
  } else {
    res.status(401).send({ message: 'Пользователь не авторизован' })
  }
}
