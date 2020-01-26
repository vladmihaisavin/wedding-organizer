const userRepository = require('./user')

module.exports = (mysqlClient) => ({
  user: userRepository(mysqlClient)
})
