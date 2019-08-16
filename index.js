const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        name: "Toni Virtanen",
        number: "040-4310965",
        id: 1
    },
    {
        name: "Arto Hellas",
        number:"040-123456",
        id:2
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})