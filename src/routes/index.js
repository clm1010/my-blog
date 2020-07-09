const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', loginCheck, async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++

  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'profile',
    userName
  }
})

module.exports = router
