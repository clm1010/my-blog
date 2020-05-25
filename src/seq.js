const Sequlize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequlize('koa2_weibo_db', 'root', 'root', conf)

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
