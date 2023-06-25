import dotenv from 'dotenv'
import cors from 'cors'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001

  try {
    app.use(cors())

    let vite: ViteDevServer | undefined
    let distPath = ''
    let srcPath = ''
    let ssrClientPath = ''

    if (isDev()) {
      srcPath = path.dirname(require.resolve('client'))
    } else {
      distPath = path.dirname(require.resolve('./client/dist/index.html'))
      ssrClientPath = require.resolve('./client/ssr-dist/client.cjs')
    }

    if (isDev()) {
      const { createServer: createViteServer } = await import('vite')

      vite = await createViteServer({
        server: { middlewareMode: true },
        root: srcPath,
        appType: 'custom',
      })

      app.use(vite.middlewares)
    }

    app.get('/api', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })

    if (!isDev()) {
      app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    }

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl

      try {
        let template: string

        if (!isDev()) {
          template = fs.readFileSync(
            path.resolve(distPath, 'index.html'),
            'utf-8'
          )
        } else {
          template = fs.readFileSync(
            path.resolve(srcPath, 'index.html'),
            'utf-8'
          )

          template = await vite!.transformIndexHtml(url, template)
        }
        let render: (url: string) => Promise<string>

        if (!isDev()) {
          render = (await import(ssrClientPath)).render
        } else {
          render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
            .render
        }

        const appHtml = await render(url)

        const html = template.replace(`<!--ssr-outlet-->`, appHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        if (isDev()) {
          vite!.ssrFixStacktrace(e as Error)
        }
        next(e)
      }
    })
  } catch (err) {
    console.log(err)
  }

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer();
