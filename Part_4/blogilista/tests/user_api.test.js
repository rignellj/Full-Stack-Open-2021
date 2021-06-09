const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const {
	initialUsers,
	apiURL,
	invalidUser,
	invalidUser2
} = require('./user_helper.test');

beforeEach(async () => {
	await User.deleteMany({});

	const userObjects = initialUsers.map(user => new User(user));
	const promiseArray = userObjects.map(user => user.save());
	await Promise.all(promiseArray);
});

describe('user creation', () => {
	test('creating a user that alreaydy exists', async () => {
		await api
			.post(apiURL)
			.send(initialUsers[0])
			.expect(400);
	});
	test('creating two invalid users', async () => {
		await api
			.post(apiURL)
			.send(invalidUser)
			.expect(400);
		await api
			.post(apiURL)
			.send(invalidUser2)
			.expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
