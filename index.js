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
        id: 2
    }
]

app.get('/info', (request, response) => {
    const date = new Date().toString()
    const info = (`Phonebook has info for ${persons.length} people`)
    response.write(`<h1>${info}</h1>`)
    response.write(date)
    response.send()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    console.log(id);
    console.log(person);
    
    if (person) {
        response.send(person)
    } else {
        response.send(404).end()
    }
})

const PORT = 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})