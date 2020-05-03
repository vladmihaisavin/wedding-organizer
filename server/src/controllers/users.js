const { Router } = require('express')
const validate = require('express-validation')
const validationRules = require('../validation/users')

module.exports = (userRepository) => {
  const app = new Router()

  app.get('/', async (req, res) => {
    try {
      const users = await userRepository.list()
      return res.status(200).json({ users })
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  app.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const results = await userRepository.store(req.body)
      return res.status(201).json({ id: results.insertId })
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  app.get('/:id', async (req, res) => {
    try {
      const user = await userRepository.getById(req.params.id)
      return res.status(200).json({ user })
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  app.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      await userRepository.update(req.params.id, req.body)
      return res.sendStatus(204)
    } catch (err) {
      return res.sendStatus(500)
    }
  })
  
  app.delete('/:id', async (req, res) => {
    try {
      await userRepository.destroy(req.params.id)
      return res.sendStatus(204)
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  return app
}