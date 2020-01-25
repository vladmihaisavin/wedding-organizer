const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const app = express()
const port = process.env.PORT || 6606

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
app.use(morgan('short', { stream: accessLogStream }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req, res) => {
  console.log(req.body)
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  )
})

app.listen(port, () => console.log(`Listening on port ${port}`))