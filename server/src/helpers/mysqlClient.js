const moment = require('moment')

const generateSimpleFilterObject = (placeholders, values) => ({
  placeholders: placeholders.reduce((acc, placeholder) => {
    acc.push(`${ placeholder } = ?`)
    return acc
  }, []).join(' AND '),
  values
})

const generateBulkFilterObject = (criteriaObjects) => ({
  placeholders: criteriaObjects.reduce((acc, criteria) => {
    acc.push(`${ criteria.field } ${ criteria.op } ?`)
    return acc
  }, []).join(' AND '),
  values: criteriaObjects.map(criteria => Array.isArray(criteria.value) ? [criteria.value] : criteria.value)
})

const prepareResults = (response, urlForResources = []) => {
  const responseResults = JSON.parse(JSON.stringify(response.results))
  if (Array.isArray(responseResults)) {
    const resultsArray = []
    for (const result of responseResults) {
      if (result.createdAt) {
        result.createdAt = moment(result.createdAt).format('YYYY-MM-DDTHH:mm')
      }
      if (result.updatedAt) {
        result.updatedAt = moment(result.updatedAt).format('YYYY-MM-DDTHH:mm')
      }
      if (urlForResources.length > 0) {
        urlForResources.forEach(resource => {
          if (result.hasOwnProperty(resource.key) && result[resource.key]) {
            result[resource.key] = `/${resource.slug}/${result[resource.key]}`
          }
        })
      }
      resultsArray.push(result)
    }
    return resultsArray
  }
  return responseResults
}

module.exports = {
  generateSimpleFilterObject,
  generateBulkFilterObject,
  prepareResults
}