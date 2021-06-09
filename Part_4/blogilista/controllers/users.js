const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User
		.find({}, { username: 1, name: 1, id: 1 })
		.populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
	res.json(users);
});

usersRouter.post('/', async (req, res, next) => {
	const { body } = req;
	const { password, username, name } = body;
	const saltRounds = 10;

	if (!password || !username || password.length < 3) {
		return res.status(400).json({ error: 'Username or password too short' });
	}
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const user = new User({ username, name, passwordHash });
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter;
