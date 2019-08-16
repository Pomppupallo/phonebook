const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))

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
    response.status(200).end()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
    // Name information is not included
    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }
    // Number information is not included
    if(!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }

    if(body.content === null) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const checkSameName = persons.find(p => p.name === body.name)

    if (checkSameName) {
        return response.status(300).json({
            error: 'name is already in database -> name must be unique'
        })
    }

    const newID = Math.floor(Math.random()*100)

    const person = {
        name: body.name,
        number: body.number,
        id: newID
    }

    persons = persons.concat(person)
    console.log(person);
    response.json(person)
})

const PORT = 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})