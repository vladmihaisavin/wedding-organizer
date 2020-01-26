const userModel = require('../models/user')
const { getCurrentTimestamp } = require('../helpers/moment')
const { generateSimpleFilterObject } = require('../helpers/mysqlClient')

module.exports = (mysqlClient) => {
  const list = async () => {
    try {
      return await mysqlClient.list(userModel.tableName, userModel.fields.projection)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const store = async (body) => {
    try {
      const now = getCurrentTimestamp()
      body.password = await hashPassword(body.password)
      body.createdAt = now
      body.updatedAt = now
      return await mysqlClient.store(userModel.tableName, body)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getById = async (id) => {
    try {
      return await mysqlClient.fetch(
        userModel.tableName,
        generateSimpleFilterObject(['id'], id),
        userModel.fields.projection
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getByEmail = async (email) => {
    try {
      return await mysqlClient.fetch(
        userModel.tableName,
        generateSimpleFilterObject(['email'], email),
        userModel.fields.projection
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const update = async (id, body) => {
    try {
      body.updatedAt = getCurrentTimestamp()
      return await mysqlClient.update(
        userModel.tableName,
        body,
        generateSimpleFilterObject(['id'], id),
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const destroy = async (id) => {
    try {
      return await mysqlClient.destroy(
        userModel.tableName,
        generateSimpleFilterObject(['id'], id),
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    list,
    store,
    getById,
    getByEmail,
    update,
    destroy
  }
}