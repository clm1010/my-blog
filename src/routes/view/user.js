/**
 * @description user view 路由
 * @author CLM
 */

const router = require('koa-router')()

/**
 * @description login 路由
 */
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

/**
 * @description register 路由
 */
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router
