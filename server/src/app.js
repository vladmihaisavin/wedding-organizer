const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const passportConfig = require('./helpers/passport')
const routes = require('./routes')
const createRepositories = require('./repositories')

const setupAccessLogs = (app) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
  app.use(morgan('short', { stream: accessLogStream }))
}

module.exports = ({ config, mysqlClient }) => {
  const app = express()
  const repositories = createRepositories(mysqlClient)

  setupAccessLogs(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(passport.initialize())
  passportConfig({ config, passport, repositories })

  app.use('/api', routes({ 
    config,
    mysqlClient,
    repositories
  }))

  app.all('*', (req, res) => {
    res.sendStatus(404)
  })
  app.use((err, req, res, next) => {
    console.error('Internal server error', err)
    res.sendStatus(500)
  })

  return app
}