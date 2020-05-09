const Joi = require('joi')

module.exports = {
  store: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required()
    }
  },
  update: {
    body: {
      email: Joi.string().email({minDomainAtoms: 2}).required()
    }
  }
}