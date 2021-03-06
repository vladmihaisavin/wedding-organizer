const userModel = require('../models/user.json')
const { hashPassword } = require('../helpers/bcrypt')
const { getCurrentTimestamp } = require('../helpers/moment')
const { generateSimpleFilterObject, generateBulkFilterObject, prepareResults } = require('../helpers/mysqlClient')

module.exports = (mysqlClient) => {
  const list = async () => {
    try {
      return prepareResults(await mysqlClient.list(userModel.tableName, userModel.fields.projection))
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
      return prepareResults(await mysqlClient.store(userModel.tableName, body))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getById = async (id) => {
    try {
      return prepareResults(await mysqlClient.fetch(
        userModel.tableName,
        generateSimpleFilterObject(['id'], [id]),
        userModel.fields.projection
      ))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getByEmail = async (email) => {
    try {
      return prepareResults(await mysqlClient.fetch(
        userModel.tableName,
        generateSimpleFilterObject(['email'], email),
        [
          ...userModel.fields.projection,
          'password'
        ]
      ))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const update = async (id, body) => {
    try {
      if (body.password) {
        body.password = await hashPassword(body.password)
      }
      body.updatedAt = getCurrentTimestamp()
      return prepareResults(await mysqlClient.update(
        userModel.tableName,
        body,
        generateSimpleFilterObject(['id'], [id]),
      ))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const bulkUpdate = async (body) => {
    try {
      body.set.updatedAt = getCurrentTimestamp()
      return prepareResults(await mysqlClient.update(
        userModel.tableName,
        body.set,
        generateBulkFilterObject(body.criteria),
      ))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const destroy = async (id) => {
    try {
      return prepareResults(await mysqlClient.destroy(
        userModel.tableName,
        generateSimpleFilterObject(['id'], [id]),
      ))
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
    bulkUpdate,
    destroy
  }
}