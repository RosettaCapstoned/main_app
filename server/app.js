const express = require('express')
const path = require('path')
const { sync, seed } = require('./db/seed')

const init = () => {
  return sync()
  .then(() => seed())
}

init()

const app = express()

app.use('/public',express.static(path.join(__dirname, '/../public')))

app.get('*', (req, res, next) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))