const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});
  
blogsRouter.post('/', async (req, res) => {
	const { body } = req;
	let { title, author, url, likes } = body;

	if (!likes) {
		likes = 0;
	} else if (!title || !url) {
		return res.status(400).end();
	}
	const blog = new Blog({ title, author, url, likes });
	const result = await blog.save();
	res.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findOneAndDelete(req.params.id);
	res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
	const { body, params } = req;
	const { likes, title, author, url } = body;

	const blog = {
		likes: likes + 1,
		title,
		author,
		url
	};
	const updatedBlog = await Blog.findByIdAndUpdate(params.id, blog, { new: true })
	res.json(updatedBlog);
});

module.exports = blogsRouter;
