/**
 * @description sequelize 实列
 * @author CLM
 */

const Sequlize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, //连接池中最大的连接数量
    min: 0, //最小
    idle: 10000 // 如果有一个连接池 10s 之内没有被使用，则释放
  }
}

const seq = new Sequlize(database, user, password, conf)

// 测试连接
// seq
//   .authenticate()
//   .then(() => {
//     console.log('ok')
//   })
//   .catch(() => {
//     console.log('err')
//   })

module.exports = seq
