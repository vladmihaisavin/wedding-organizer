const config = require('./config')
const createApp = require('./src/app')

const startServer = () => {
  const app = createApp(config)

  return new Promise((resolve, reject) => {
    try {
      const server = app.listen(config.get('port'), () => {
        console.log(`Listening on port ${server.address().port}`)
        return resolve()
      })
      server.once('error', err => {
        return reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const setupProcessHooks = () => {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception', err)
    process.exit(1)
  })

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down app')
    process.exit(1)
  })
}

(async () => {
  try {
    console.log('Application starting up')

    setupProcessHooks()
    await startServer()
    
    console.log('Application startup completed')
  } catch (err) {
    console.error(err, 'Fatal error during application startup')
  }
})()

