const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

// 路由
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
// 如果是线上环境出现错误，跳转到错误页

if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}

onerror(app, onerrorConf)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

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

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())

// 404路由注册到最后面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
