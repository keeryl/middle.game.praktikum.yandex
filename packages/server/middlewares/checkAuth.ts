import type { NextFunction, Request, Response } from 'express';

export function checkAuth (req: Request, res: Response, next: NextFunction) {
  if (req.cookies.uuid && req.cookies.authCookie) {
    next();
  } else {
      res.status(401).send({ message: "Пользователь не авторизован" });
  }
  // fetch(`https://ya-praktikum.tech/api/v2/user`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include',
  // })
  //   .then(res => {
  //     console.log(res)
  //     return res.json()
  //   })
  //   .then(data => {
  //     console.log('DATA', data)
  //     if (data.user) {
  //       next()
  //     }
  //     res.send(data.reason)
  //   })
  //   .catch(err => {
  //     console.error('ERROR', err)
  //     res.send(err)
  //   })
}