/**
 * @description utils controller
 * @author CLM
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fsExtra = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//  文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fsExtra.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fsExtra.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保持文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
  // 如果上传的文件大于 最大值 那么久删除 文件
  if (size > MIX_SIZE) {
    await fsExtra.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动文件
  const fileName = Date.now() + '.' + name //加上 时间戳 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fsExtra.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
