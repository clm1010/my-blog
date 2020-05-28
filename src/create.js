// insert
const { Blog, User } = require('./model')

!(async function () {
  // 创建User
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三'
  })
  console.log('zhangsan', zhangsan.dataValues)

  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  })
  console.log('lisi', lisi.dataValues)

  // 创建Blog
  const blog1 = await Blog.create({
    title: '标题1',
    content: '内容1',
    userId: 1
  })
  console.log('blog1', blog1.dataValues)

  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: 1
  })
  console.log('blog2', blog2.dataValues)

  const blog3 = await Blog.create({
    title: '标题3',
    content: '内容3',
    userId: 2
  })
  console.log('blog3', blog3.dataValues)

  const blog4 = await Blog.create({
    title: '标题4',
    content: '内容4',
    userId: 2
  })
  console.log('blog4', blog4.dataValues)
})()
