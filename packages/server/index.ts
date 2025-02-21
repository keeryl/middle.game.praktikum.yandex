import dotenv from 'dotenv'
import cors from 'cors'
import type { ViteDevServer } from 'vite'
import { dbConnect } from './db'
import { router } from './router'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'


import express from 'express'
import * as fs from 'fs'
import * as path from 'path'



const app = express()
const port = Number(process.env.SERVER_PORT) || 3001
dotenv.config()


const isDev = () => process.env.NODE_ENV === 'development'


async function startServer() {
  app.use(cors());
  try {
    await dbConnect()
    app.use(
      '/api/v2',
      createProxyMiddleware({
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': 'good-game.ya-praktikum.tech',
        },
        target: 'https://ya-praktikum.tech',
      })
    )
    

    app.use(cookieParser());
    app.use(router);
    let vite: ViteDevServer | undefined;
    let distPath = '';
    let srcPath = '';
    let ssrClientPath = '';
    let template: string;
    let render: (url: string, state: any) => Promise<string>;


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
      app.use(vite.middlewares);
    }
      

    app.get('/api', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })


    if (!isDev()) {
      app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }


    app.use('*', async (req, res, next) => {
    const url = req.originalUrl


      try {
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


        if (!isDev()) {
          render = (await import(ssrClientPath)).render
        } else {
          render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
            .render
        }


        const [appHtml, initialState] = await render(url, {});
        const stateMarkup = `<script>window.__REDUX_STATE__ = ${initialState}</script>`
        const html = template.replace(`<!--ssr-outlet-->`, appHtml + stateMarkup)


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
    console.log(` ➜ 🎸 Server is listening on port: ${port}`)
  })
}


startServer();
