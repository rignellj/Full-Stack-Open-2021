require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Contact = require('./models/contact');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

const errorHandler = (err, req, res, next) => {
	const { message, name } = err;

	console.log(message);
	if (name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (name === 'ValidationError') {
		return res.status(400).send({ error: message });
	}
	next(err);
};

morgan.token('post_content', function getContent (req) {
	return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length]  - :response-time ms :post_content', {
	skip: (req) => {
		return req.method !== 'POST';
	}
}));

app.get('/info', (req, res, next) => {
	Contact.find({})
		.then(result => {
			const content = `<p>Phone book has info for ${result.length} people</p><p>${new Date()}</p>`;
			res.send(content);
		})
		.catch(err => next(err));
});

app.get('/api/persons', (req, res, next) => {
	Contact.find({})
		.then(contact => res.json(contact))
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
		.catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
	const { body } = req;
	const { name, number } = body;

	Contact.find({})
		.then(result => {
			const foundContact = result.filter(person => person.name === name);
			if (foundContact.length > 0) {
				return res.status(400).json({ error: 'Person is already in the PhoneBook' });
			}
		})
		.catch(err => next(err));
	const person = new Contact({ name, number });

	person.save()
		.then(savedPerson => res.json(savedPerson))
		.catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Contact.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const { body, params } = req;
	const { name, number } = body;

	const contact = { name, number };
	Contact.findByIdAndUpdate(params.id, contact, { new: true })
		.then(updatedContact => res.json(updatedContact))
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
