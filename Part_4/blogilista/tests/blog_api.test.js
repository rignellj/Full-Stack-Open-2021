const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const {
	initialBlogs,
	newBlog,
	newBlogWithoutLikes,
	blogWithoutUrl,
	blogWithoutTitle,
	blogWithoutTitleOrUrl,
	blogToBeDeleted,
	apiUrl
} = require('./blog_helper.test');

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = initialBlogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});

describe('form', () => {
	test('blogs are returned as JSON', async () => {
		await api
			.get(apiUrl)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	});
});

describe('blogs based tests', () => {
	test('all blogs are returned', async () => {
		const { body } = await api.get(apiUrl);
	
		expect(body).toHaveLength(initialBlogs.length);
	});
	test('a spesific url is within returned blogs', async () => {
		const { body } = await api.get(apiUrl);
		const contents = body.map(item => item.url)
	
		expect(contents).toContain('www.com.www');
	});
	test('id property check', async () => {
		const { body } = await api.get(apiUrl);
		const ids = body.map(item => item.id);

		expect(ids[0]).toBeDefined();
	});
});

describe('routes', () => {
	test('new blog can be added', async () => {
		await api
			.post(apiUrl)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const { body } = await api.get(apiUrl);
		const titles = body.map(item => item.title);
		expect(body).toHaveLength(initialBlogs.length + 1);
		expect(titles).toContain('new blog can be added');
	});
	test('likes are initialized to 0 if not specified', async () => {
		const { body } = await api
			.post(apiUrl)
			.send(newBlogWithoutLikes)
			.expect(201)
		expect(body.likes).toBe(0);
	});
	test('post request without url or title fails with 400 status code', async () => {
		await api
			.post(apiUrl)
			.send(blogWithoutUrl)
			.expect(400)
		await api
			.post(apiUrl)
			.send(blogWithoutTitle)
			.expect(400)
		await api
			.post(apiUrl)
			.send(blogWithoutTitleOrUrl)
			.expect(400)
	});
	test('delete request returns 204 status code', async () => {
		const { body } = await api
			.post(apiUrl)
			.send(blogToBeDeleted)
			.expect(201);
		const { id } = body;
		await api
			.delete(apiUrl + '/' + id)
			.expect(204)
	})
	test('likes increase by one if blog is updated', async () => {
		const { body } = await api
			.post(apiUrl)
			.send(newBlogWithoutLikes)
			.expect(201);
		const { id } = body;
		const response = await api
			.put(apiUrl + '/' + id)
			.send(body);
		expect(response.body.likes).toBe(1);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
