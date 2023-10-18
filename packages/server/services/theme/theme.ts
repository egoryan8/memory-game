import type { Handler } from 'express'
import { Theme } from '../../models/theme/theme'

export const setUserTheme: Handler = async (req, res) => {
  if (req.body) {
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
  if (req.body) {
    const { user_id, theme } = req.body

    try {
      const [themeInstance, created] = await Theme.upsert(
        { user_id, theme },
        { returning: true }
      )
      res.status(200).json({ themeInstance, created })
    } catch (error) {
      res.status(500).send({ error: 'Ошибка при обновлении темы' })
    }
  } else {
    res.status(404).json({ error: 'Данные не пришли или неполные' })
  }
}

export const getTheme: Handler = async (req, res) => {
  const { user_id } = req.query

  try {
    const theme = await Theme.findOne({ where: { user_id } })

    if (theme) {
      res.status(200).json(theme.theme)
    } else {
      res.status(200).json(null)
    }
  } catch (error) {
    res.status(500).send({ error: 'Ошибка при получении темы' })
  }
}
