import type { Request, Response, NextFunction } from 'express'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.cookie) {
    fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        cookie: req.headers.cookie,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(user => {
        res.locals.user = user
        console.log(res.locals.user)
        next()
      })
  } else {
    res.status(403).json({ reason: 'Пользователь не авторизован!' })
  }
}
