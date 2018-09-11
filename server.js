const http = require('http')
const fs = require('fs')

const PORT = 3000

fs.readFile('./index.html', (err, html) => {
  if (err) throw err

  http.createServer((req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(html)
    res.end()
  }).listen(PORT)

  console.log(`Listening on port: ${PORT}`)
})
