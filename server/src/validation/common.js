const Joi = require('joi')

const bulkUpdateCriteriaObject = Joi.object({
  field: Joi.string().required(),
  op: Joi.string().valid('<', '=', '>', 'like', 'in').required(),
  value: Joi.string().required()
})

module.exports = {
  bulkUpdateCriteriaObject
}