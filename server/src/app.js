const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')

const setupAccessLogs = (app) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
  app.use(morgan('short', { stream: accessLogStream }))
}

module.exports = (config) => {
  const app = express()

  setupAccessLogs(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/api', routes(config))

  app.all('*', (req, res) => {
    res.sendStatus(404)
  })
  app.use((err, req, res, next) => {
    console.error('Internal server error', err)
    res.sendStatus(500)
  })
  
  return app
}
