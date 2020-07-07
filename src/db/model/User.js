/**
 * @description 用户数据模型
 * @author CLM
 */

const seq = require('../seq')
const { STRING, STRING_45, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
  userName: {
    type: STRING_45,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING_45,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别（1 男性，2 女性，3 保密）'
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User