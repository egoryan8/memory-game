import type { Handler } from 'express'
import { Theme } from '../../models/theme/theme'

export const allTheme: Handler = async (req, res) => {
  if (req.headers.cookie) {
    try {
      const themes = await Theme.findAll()

      if (themes) {
        res.status(200).json({ themes })
      } else {
        res.status(404).json({ reason: 'Темы отсутствуют!' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(403).json({ message: 'Пользователь не авторизован!' })
  }
}

export const createPost: Handler = async (req, res) => {
  if (req.headers.cookie && req.body) {
    const { theme, user_id } = req.body

    const newPost = await Theme.create({
      theme,
      user_id,
    })

    res.status(200).json(newPost)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}

export const updateTheme: Handler = async (req, res) => {
  if (req.headers.cookie && req.body) {
    const { theme, user_id } = req.body

    const result = await Theme.update({ theme }, { where: { user_id } })

    if (result[0] === 0) {
      // Если номер обновленных строк равен 0, значит не было найдено соответствующего пользователя
      res
        .status(404)
        .json({ error: 'Данные не обновлены, возможно неверное user_id' })
    } else {
      res.status(200).json({ message: 'Тема успешно обновлена' })
    }
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}
