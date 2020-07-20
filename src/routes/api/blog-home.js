/**
 * @description 首页 API 路由
 * @author CLM
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, async () => {})

module.exports = router
