
const generateSimpleFilterObject = (placeholders, values) => ({
  placeholders: placeholders.reduce((acc, placeholder) => {
    acc.push(`${ placeholder } = ?`)
    return acc
  }, []).join(', '),
  values
})

module.exports = {
  generateSimpleFilterObject
}