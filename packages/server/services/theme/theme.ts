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

export const setUserTheme: Handler = async (req, res) => {
  if (req.headers.cookie && req.body) {
    const { theme, user_id } = req.body

    const newTheme = await Theme.create({
      theme,
      user_id,
    })

    res.status(200).json(newTheme)
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}

export const updateTheme: Handler = async (req, res) => {
  const { user_id, theme } = req.body

  try {
    const [themeInstance, created] = await Theme.upsert(
      { user_id, theme },
      { returning: true }
    )
    res.json({ themeInstance, created })
  } catch (error) {
    res.status(500).send({ error: 'Ошибка при обновлении темы' })
  }
}

export const getTheme: Handler = async (req, res) => {
  const { user_id } = req.query

  try {
    const theme = await Theme.findOne({ where: { user_id } })

    if (theme) {
      res.json(theme.theme)
    } else {
      res.status(404).send({ error: 'Пользователь не найден' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Ошибка при получении темы' })
  }
}
