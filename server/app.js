const express = require('express')
const path = require('path')
const { sync, seed } = require('./db/seed')

const app = express()

app.use(express.json())
app.use('/public',express.static(path.join(__dirname, '/../public')))

app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const init = () => {
  return sync()
  .then(() => seed())
}

init()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))