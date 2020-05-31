import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-generic-session'
import redisStore from 'koa-redis'

import { REDIS_CONF } from './conf/db'

import index from './routes/index'
import users from './routes/users'

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// session 设置 加密
app.keys = ['Clm_851010!#$']
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认 `koa.sid`
    prefix: 'weibo:sess:', //redis key 的前缀，默认是`koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // cookie过期时间
    },
    // ttl: 24 * 60 * 60 * 1000, // redis过期时间，如果cookie配置了过期时间 这里就不需要写了
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
