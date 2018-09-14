const express = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const cors = require('cors')

const app = express()
const PORT = process.env.API_PORT || 3000

app.use(bodyParser())
app.use(cors())

app.get('/api/public', (req, res) => {
  res.status(200)
     .send('This is public content')
})

app.get(
  '/api/private',
  expressJwt({secret: 'mysupersecretkey'}),
  (req, res) => {
    res.status(200)
       .send('This is private information')
  })

app.get('*', (req, res) => res.status(404))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
