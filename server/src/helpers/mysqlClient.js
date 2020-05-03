
const generateSimpleFilterObject = (placeholders, values) => ({
  placeholders: placeholders.reduce((acc, placeholder) => {
    acc.push(`${ placeholder } = ?`)
    return acc
  }, []).join(', '),
  values
})

const prepareResults = (response) => {
  return JSON.parse(JSON.stringify(response.results))
}

module.exports = {
  generateSimpleFilterObject,
  prepareResults
}