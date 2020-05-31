/**
 * @description jest server
 * @author CLM
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
