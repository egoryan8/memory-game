import { Router } from 'express'
import { getTheme, setUserTheme, updateTheme } from '../services/theme/theme'

const themeRouter = Router()

themeRouter.post('/', setUserTheme)
themeRouter.put('/', updateTheme)
themeRouter.get('/', getTheme)

export { themeRouter }
