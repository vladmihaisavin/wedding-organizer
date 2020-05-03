const { Router } = require('express')
const { version } = require('../package.json')
const authenticate = require('./middlewares/authenticate')
const accounts = require('./controllers/accounts')
const users = require('./controllers/users')

module.exports = ({ config, repositories }) => {
  const app = new Router()

  app.get('/info', (req, res) => {
    res.json({ version })
  })
  app.use('/accounts', accounts({ config, userRepository: repositories.user }))
  app.use('/users', authenticate, users(repositories.user))

  return app
}