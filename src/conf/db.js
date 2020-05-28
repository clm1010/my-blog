/**
 * @description 存储配置
 * @author CLM
 */
const { isProd } = require('../utils/env')
let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  REDIS_CONF
}
