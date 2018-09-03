const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8888
const users = [
  {id: 1, username: 'admin', password: 'admin'},
  {id: 2, username: 'guest', password: 'guest'},
]

app.use(bodyParser.json())
app.use(cors())

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400)
              .send('You need a username and password')
  }

  const user = users.find((user) => {
    return req.body.username === user.username &&
      req.body.password === user.password
  })

  if (!user) {
    return res.status(401)
              .send('You need to create a new user')
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, "mysupersecretkey", {expiresIn: "3 hours"})

  res.status(200)
     .send({access_token: token})
})

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
