import type { Request, Response, NextFunction } from 'express'
import axios from 'axios'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.cookie) {
    try {
      const response = await axios.get(
        'https://ya-praktikum.tech/api/v2/auth/user',
        {
          headers: {
            cookie: req.headers.cookie,
          },
        }
      )

      if (response.status === 200) {
        res.locals.user = response.data
        next()
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      res.status(500).json({ reason: 'Ошибка при проверке авторизации' })
    }
  } else {
    res.status(403).json({ reason: 'Пользователь не авторизован!' })
  }
}
