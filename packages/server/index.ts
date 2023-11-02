import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as console from 'console'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import AuthApi from './api/AuthApi'
import { cleanPath } from './cleanPath'
import { createSequelizeConnection } from './db'
import { apiRoutes } from './routes'
import * as process from 'process'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'
async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 9000

  let vite: ViteDevServer | undefined
  const distPath = isDev()
    ? path.resolve('../client/dist')
    : cleanPath(path.resolve('../client/dist'))
  const srcPath = isDev()
    ? path.resolve('../client')
    : cleanPath(path.resolve('../client'))
  const ssrClientPath = isDev()
    ? path.resolve('../client/ssr-dist')
    : cleanPath(path.resolve('../client/ssr-dist'))

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }
  app.use(compression())
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )
  app.use('/api', apiRoutes)

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    try {
      const url = req.originalUrl
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      interface SSRModule {
        render: (
          uri: string,
          api: any
        ) => Promise<[Record<string, any>, string]>
      }

      let mod: SSRModule

      if (isDev()) {
        mod = (await vite!.ssrLoadModule(
          path.resolve(srcPath, 'ssr.tsx')
        )) as SSRModule
      } else {
        mod = await import(path.resolve(ssrClientPath, 'ssr.cjs'))
      }

      const { render } = mod
      const [initialState, appHtml] = await render(
        url,
        AuthApi(req.headers['cookie'])
      )

      const initStateSerialized = JSON.stringify(initialState).replace(
        /</g,
        '\\u003c'
      )
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--store-data-->', initStateSerialized)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () =>
    console.log(`  ➜ 🎸 Server is listening on port: http://localhost:${port}`)
  )
}

async function start() {
  await createSequelizeConnection()
  await startServer()
}

start()
