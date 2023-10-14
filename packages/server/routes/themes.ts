import { Router } from 'express'
import { allTheme, createPost, updateTheme } from '../services/theme/theme'

const themeRouter = Router()

themeRouter.get('/', allTheme)
themeRouter.post('/', createPost)
themeRouter.put('/', updateTheme)

export { themeRouter }
