const convict = require('convict')

module.exports = convict({
  appEnv: {
    doc: 'The environment that the app is run on.',
    format: ['production', 'local'],
    env: 'APP_ENV',
    default: 'production'
  },
  port: {
    doc: 'The port the app is listening to.',
    format: 'port',
    env: 'PORT',
    default: 6606
  }
}).validate({allowed: 'strict'})
