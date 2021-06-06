require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const app = express();
const Contact = require('./models/contact');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

const errorHandler = (err, req, res, next) => {
	console.log(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ err: 'malformatted id' });
	}
	next(err);
};

morgan.token('post_content', function getContent (req, res) {
	return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length]  - :response-time ms :post_content', {
	skip: (req, res) => {
		return req.method !== "POST"
	}
}));

app.get('/info', (req, res, next) => {
	Contact.find({})
	.then(result => {
		const content = `<p>Phone book has info for ${result.length} people</p><p>${new Date()}</p>`;
		res.send(content)
	})
	.catch(err => next(err))
});

app.get('/api/persons', (req, res, next) => {
	Contact.find({})
	.then(contact => {
		console.log(contact);
		res.json(contact);
	})
	.catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
	Contact.findById(req.params.id)
	.then(contact => {
		if (contact) {
			res.json(contact);
		} else {
			res.status(404).end();
		}
	})
	.catch(err => next(err))
});

app.post('/api/persons', (req, res) => {
	const { body } = req;
	const { name, number } = body;

	if (!number || !name) {
		return res.status(400).json({ error: 'Number or name is missing!' });
	} 
	// else if (persons.find(person => person.name === name)) {
	// 	return res.status(400).json({ error: 'Person is already in the PhoneBook' });
	// }
	const person = new Contact({ name, number });

	person.save()
	.then(savedPerson => {
		res.json(savedPerson);
	})
});

app.delete('/api/persons/:id', (req, res, next) => {
	Contact.findByIdAndRemove(req.params.id)
	.then(result => {
		res.status(204).end();
	})
	.catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const { body, params } = req;
	const { name, number } = body;

	const contact = { name, number };
	Contact.findByIdAndUpdate(params.id, contact, { new: true })
	.then(updatedContact => {
		res.json(updatedContact);
	})
	.catch(err => next(err));
});

const unknowEndPoint = (req, res) => {
	res.status(404).send({ error: 'Unknown error' });
};

app.use(unknowEndPoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
	console.log(`Server running on port ${PORT}`);
});
