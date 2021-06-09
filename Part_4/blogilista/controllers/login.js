const { SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
	const { body } = req;
	const { username, password } = body;
	const user = await User.findOne({ username });
	let passwordCorrect;

	if (user === null) {
		passwordCorrect = false;
	} else {
		passwordCorrect = await bcrypt.compare(password, user.passwordHash);
	}
	if (!user || !passwordCorrect) {
		return res.status(401).json({ error: 'invalid username or password' });
	}
	const userForToken = {
		username,
		id: user._id
	};
	const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 });
	res
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
