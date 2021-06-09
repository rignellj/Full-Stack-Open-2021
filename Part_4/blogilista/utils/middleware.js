const { SECRET } = require('./config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
	const { message, name } = error;

	if (name === 'ValidationError') {
		return response.status(400).send({ error: message });
	} else if (name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		});
	} else if (name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired'
		});
	}
	next(error);
};

const tokenExtractor = (req, res, next) => {
	const getTokenFrom = req => {
		const auth = req.get('authorization');
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			return auth.substring(7);
		}
		return null;
	};
	req.token = getTokenFrom(req);
	next();
};

const userExtractor = async (req, res, next) => {
	const getUser = async (req) => {
		const { token } = req;
		const { id } = jwt.verify(token, SECRET);
		if (!token || !id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
		return await User.findById(id);
	};
	req.user = await getUser(req);
	next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
