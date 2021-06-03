const express = require('express');
const morgan = require('morgan')
const app = express();

let persons =  [
	{
		name: "Arto Hellas",
		number: "040-789456123",
		id: 1
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4
	}
]

app.use(express.json());

morgan.token('post_content', function getContent (req, res) {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length]  - :response-time ms :post_content', {
	skip: (req, res) => {
		return req.method !== "POST"
	}
}))

app.get('/info', (req, res) => {
	const content = `<p>Phone book has info for ${persons.length} people</p><p>${new Date()}</p>`;
	res.send(content);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find(person => id === person.id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.number || !body.name) {
		return res.status(400).json({ error: 'Number or name is missing!' });
	} else if (persons.find(person => person.name === body.name)) {
		return res.status(400).json({ error: 'Person is already in the PhoneBook' });
	}
	const person = {
		name: body.name,
		number: body.number,
		id: Math.random() * 100
	}
	persons = persons.concat(person);
	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter(person => id !== person.id);
	res.status(204).end();
});

const PORT = 3001;
app.listen(PORT || 3001, () => {
	console.log(`Server running on port ${PORT}`);
});
