const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型
const User = seq.define('user', {
  // id 会自动创建，并设为主键、自增
  userName: {
    type: Sequelize.STRING(45), // 'varchar(255)' 默认255
    allowNull: false,
    comment: '姓名'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: Sequelize.STRING(45),
    comment: '昵称'
  }
  // 自动创建：createdAt 和 updatedAt
})

const Blog = seq.define('blog', {
  // id 会自动创建，并设为主键、自增
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '标题'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '内容'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '对用Users表的id'
  }
})

// 外键关联
// 第一种 belongsTo 创建
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId', // 外键
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// 第二种 hasMany 创建
User.hasMany(Blog, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

// 创建Blog模型
module.exports = {
  User,
  Blog
}
