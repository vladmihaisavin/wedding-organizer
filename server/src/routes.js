const { Router } = require('express')
const { version } = require('../package.json')

module.exports = (config) => {
  const api = new Router()

  api.get('/info', (req, res) => {
    res.json({ version })
  });

  return api
}