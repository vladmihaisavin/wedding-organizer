const Joi = require('joi')
const { bulkUpdateCriteriaObject } = require('./common')

module.exports = {
  store: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  update: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      type: Joi.string().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  partialUpdate: {
    body: {
      name: Joi.string(),
      email: Joi.string().email({minDomainAtoms: 2}),
      type: Joi.string(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  },
  bulkUpdate: {
    body: {
      criteria: Joi.array().items(bulkUpdateCriteriaObject),
      set: Joi.object({
        name: Joi.string(),
        email: Joi.string().email({minDomainAtoms: 2}),
        type: Joi.string(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      })
    }
  }
}