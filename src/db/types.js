/**
 * @description 封装 sequelize 数据类型
 * @author CLM
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  STRING_45: Sequelize.STRING(45),
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
  DATETIME: Sequelize.DATETIME
}
